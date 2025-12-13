import { Injectable, signal } from '@angular/core';
import { FooterContentKey } from '../types/FooterContentKey';

@Injectable({
  providedIn: 'root',
})
export class FooterModalService {
  // State for controlling the visibility and type of the authentication modal
  private _isOpen = signal(false);
  private _isClosing = signal(false);
  private _contentKey = signal<FooterContentKey | null>(null);

  // Exposing the state as read-only signals
  isOpen = this._isOpen.asReadonly();
  isClosing = this._isClosing.asReadonly();
  contentKey = this._contentKey.asReadonly();

  // Open modal with selected content
  openModal(contentKey: FooterContentKey) {
    this._isOpen.set(true);
    this._isClosing.set(false);
    this._contentKey.set(contentKey);
  }

  // Close the modal
  closeModal() {
    this._isClosing.set(true);

    // Wait for the animation to finish before removing from DOM
    setTimeout(() => {
      this._isOpen.set(false);
      this._isClosing.set(false);
      this._contentKey.set(null);
    }, 250);
  }
}
