import { Component, inject, Renderer2, effect, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, User, Mail, Lock, X, ArrowRight } from 'lucide-angular';

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
  // Inject services
  protected authModalService = inject(AuthModalService);
  private renderer = inject(Renderer2);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  // Lucide icons
  User = User;
  Mail = Mail;
  Lock = Lock;
  X = X;
  ArrowRight = ArrowRight;

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

  // Loading state
  isLoading = signal(false);

  // Handle scrolling allowed or not
  constructor() {
    effect(() => {
      // Toggle scrolling
      const isOpen = this.authModalService.isOpen();
      this.toggleBodyScroll(isOpen);

      // Reset forms when modal is closed
      if (!isOpen) {
        this.isLoading.set(false);
        this.loginForm.reset();
        this.signupForm.reset();
      }
    });
  }

  // Sign up method
  onSubmitLogin() {
    // If form is invalid, trigger all validation messages
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Set loading state
    this.isLoading.set(true);

    // Set login request
    const request = this.loginForm.value as LoginRequest;

    // Login
    this.authService.login(request).subscribe({
      next: () => {
        this.toastService.show('Logged in successfully!', 'success');
        this.closeAndGoDashboard();
      },
      error: () => {
        this.isLoading.set(false);
        this.toastService.show('Login failed. Please check your email and password.', 'error');
      },
    });
  }

  // Sign up method
  onSubmitSignup() {
    // If form is invalid, trigger all validations messages
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    // Set loading state
    this.isLoading.set(true);

    // Set register request
    const request = this.signupForm.value as RegisterRequest;

    // Register and log in
    this.authService.register(request).subscribe({
      next: () => {
        const loginRequest: LoginRequest = {
          email: this.signupForm.value.email!,
          password: this.signupForm.value.password!,
        };
        this.authService.login(loginRequest).subscribe({
          next: () => {
            this.isLoading.set(false);
            this.toastService.show('Registered & logged in successfully!', 'success');
            this.closeAndGoDashboard();
          },
          error: () => {
            this.isLoading.set(false);
            this.toastService.show('Registration successful. Please log in manually.', 'success');
            this.authModalService.close();
          },
        });
      },
      error: (error) => {
        this.isLoading.set(false);
        this.toastService.show(
          error.status === 409
            ? 'This email is already registered. Try logging in.'
            : 'An unexpected error occurred. Please try again.',
          'error',
        );
      },
    });
  }

  // Close modal and navigate to dashboard when login is successful
  private closeAndGoDashboard() {
    this.authModalService.close();
    this.router.navigate(['/dashboard']);
  }

  // Disable scrolling
  toggleBodyScroll(enable: boolean) {
    const cls = 'overflow-hidden';
    enable
      ? this.renderer.addClass(document.body, cls)
      : this.renderer.removeClass(document.body, cls);
  }
}
