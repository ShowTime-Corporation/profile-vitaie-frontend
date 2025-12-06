import { Component, inject, Renderer2, effect } from '@angular/core';
import { AuthModalService } from '../../../services/auth-modal-service';
import { LucideAngularModule, User, Mail, Lock, X, ArrowRight } from 'lucide-angular';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-modal',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './auth-modal.html',
})
export class AuthModal {
  // Inject services
  protected modal = inject(AuthModalService);
  private renderer = inject(Renderer2);
  private fb = inject(FormBuilder);

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

  // Constructor
  constructor() {
    // Add or remove 'overflow-hidden' class to body when modal opens/closes
    effect(() => {
      if (this.modal.isOpen()) {
        this.addBodyNoScrollClass();
      } else {
        this.removeBodyNoScrollClass();
      }
    });
  }

  // Handle login form submission
  onSubmitLogin() {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      // Authentication service
      this.modal.close();
    }
  }

  // Handle signup form submission
  onSubmitSignup() {
    if (this.signupForm.valid) {
      console.log('Signup form submitted:', this.signupForm.value);
      // Authentication service
      this.modal.close();
    }
  }

  // Prevent scrolling on the body when the modal is open
  private addBodyNoScrollClass(): void {
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  // Allow scrolling on the body when the modal is closed, and reset the forms fields
  private removeBodyNoScrollClass(): void {
    this.loginForm.reset();
    this.signupForm.reset();
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }

  // Icons
  User = User;
  Mail = Mail;
  Lock = Lock;
  X = X;
  ArrowRight = ArrowRight;
}
