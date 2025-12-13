import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  // State for controlling the visibility and type of the authentication modal
  private _isLogin = signal(true);
  private _isOpen = signal(false);
  private _isClosing = signal(false);


  // Exposing the state as read-only signals
  isOpen = this._isOpen.asReadonly();
  isLogin = this._isLogin.asReadonly();
  isClosing = this._isClosing.asReadonly();


  // Methods to interact with the modal state
  openLoginModal() {
    this._isLogin.set(true);
    this._isOpen.set(true);
    this._isClosing.set(false);
  }

  openSignupModal() {
    this._isLogin.set(false);
    this._isOpen.set(true);
    this._isClosing.set(false);
  }

  // Toggle between login and signup forms
  toggleForm() {
    this._isLogin.update((value) => !value);
  }

  // Close the modal
  close() {
    this._isClosing.set(true);

    // Wait for the animation to finish before removing from DOM
    setTimeout(() => {
      this._isOpen.set(false);
      this._isClosing.set(false);
    }, 250);
  }
}
