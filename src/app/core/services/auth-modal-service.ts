import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  // State for controlling the visibility and type of the authentication modal
  private _isLogin = signal(true);
  private _isOpen = signal(false);

  // Exposing the state as read-only signals
  isOpen = this._isOpen.asReadonly();
  isLogin = this._isLogin.asReadonly();

  // Methods to interact with the modal state
  openLoginModal() {
    this._isLogin.set(true);
    this._isOpen.set(true);
  }

  openSignupModal() {
    this._isLogin.set(false);
    this._isOpen.set(true);
  }

  // Toggle between login and signup forms
  toggleForm() {
    this._isLogin.update((value) => !value);
  }

  // Close the modal
  close() {
    this._isOpen.set(false);
  }
}
