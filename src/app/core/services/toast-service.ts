import { Injectable, signal } from '@angular/core';
import { Toast } from '../interfaces/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // Toast service
  private _toast = signal<Toast | null>(null);
  toast = this._toast.asReadonly();

  // Show toast
  show(message: string, type: 'success' | 'error' = 'success') {
    this._toast.set({ message, type });
  }

  // Hide toast
  hide() {
    this._toast.set(null);
  }
}
