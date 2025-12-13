import { Component, inject, Renderer2, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  User,
  Mail,
  Lock,
  X,
  ArrowRight,
} from 'lucide-angular';

import { AuthModalService } from '../../../services/auth-modal-service';
import { AuthService } from '../../../services/auth-service';
import { ToastService } from '../../../services/toast-service';

import { RegisterRequest } from '../../../interfaces/register-request';
import { LoginRequest } from '../../../interfaces/login-request';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-auth-modal',
  imports: [LucideAngularModule, ReactiveFormsModule, NgClass],
  templateUrl: './auth-modal.html',
})
export class AuthModal {
  protected modal = inject(AuthModalService);
  private renderer = inject(Renderer2);
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  // Log in form
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  // Sign up form
  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  // Error and loading states
  loginError: string | null = null;
  signupError: string | null = null;
  isSigningUp = false;

  // Handle scrolling allowed or not
  constructor() {
    effect(() => {
      const isOpen = this.modal.isOpen();
      this.toggleBodyScroll(isOpen);

      if (!isOpen) {
        this.loginForm.reset();
        this.signupForm.reset();
      }
    });
  }

  // Sign up method
  onSubmitLogin() {
    this.loginError = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request = this.loginForm.value as LoginRequest;

    this.auth.login(request).subscribe({
      next: () => {
        this.toast.show('Logged in successfully!', 'success');
        this.closeAndGoDashboard();
      },
      error: () => {
        this.loginError = 'Login failed. Please check your email and password.';
        this.toast.show('Login failed', 'error');
      },
    });
  }

  // Sign up method
  onSubmitSignup() {
    this.signupError = null;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isSigningUp = true;
    const request = this.signupForm.value as RegisterRequest;

    this.auth.register(request).subscribe({
      next: () => {
        const loginRequest: LoginRequest = {
          email: this.signupForm.value.email!,
          password: this.signupForm.value.password!,
        };
        this.auth.login(loginRequest).subscribe({
          next: () => {
            this.isSigningUp = false;
            this.toast.show('Registered & logged in successfully!', 'success');
            this.closeAndGoDashboard();
          },
          error: () => {
            this.isSigningUp = false;
            this.toast.show('Registration successful. Please log in manually.', 'success');
            this.modal.close();
          },
        });
      },
      error: (error) => {
        this.isSigningUp = false;
        this.signupError =
          error.status === 409
            ? 'This email is already registered. Try logging in.'
            : 'An unexpected error occurred. Please try again.';
        this.toast.show(this.signupError, 'error');
      },
    });
  }

  // Close modal and navigate to dashboard when login is successful
  private closeAndGoDashboard() {
    this.modal.close();
    this.router.navigate(['/dashboard']);
  }

  toggleBodyScroll(enable: boolean) {
    const cls = 'overflow-hidden';
    enable
      ? this.renderer.addClass(document.body, cls)
      : this.renderer.removeClass(document.body, cls);
  }

  // Lucide icons
  User = User;
  Mail = Mail;
  Lock = Lock;
  X = X;
  ArrowRight = ArrowRight;
}
