import { Injectable, signal } from '@angular/core';
import { Toast } from '../interfaces/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toast = signal<Toast | null>(null);
  toast = this._toast.asReadonly();

  show(message: string, type: 'success' | 'error' = 'success') {
    this._toast.set({ message, type });
  }

  hide() {
    this._toast.set(null);
  }
}
