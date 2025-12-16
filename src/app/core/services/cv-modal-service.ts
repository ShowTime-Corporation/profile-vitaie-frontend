import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CvModalService {
  // State for controlling the visibility of the CV modal
  private _isOpen = signal(false);
  private _isClosing = signal(false);

  // Expose read-only signals
  isOpen = this._isOpen.asReadonly();
  isClosing = this._isClosing.asReadonly();

  // Open modal
  open() {
    this._isOpen.set(true);
    this._isClosing.set(false);
  }

  // Close the modal with an animation delay
  close() {
    this._isClosing.set(true);

    // wait for closing animation to finish before removing from DOM
    setTimeout(() => {
      this._isOpen.set(false);
      this._isClosing.set(false);
    }, 250);
  }
}
