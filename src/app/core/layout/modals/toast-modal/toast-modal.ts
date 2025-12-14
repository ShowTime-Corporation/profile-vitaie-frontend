import { Component, effect, inject, signal } from '@angular/core';
import { ToastService } from '../../../services/toast-service';
import { Check, LucideAngularModule, X } from 'lucide-angular';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast-modal',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './toast-modal.html',
})
export class ToastModal {
  // Inject service
  protected toastService = inject(ToastService);

  // Lucide icons
  protected readonly Check = Check;
  protected readonly X = X;

  // Animation state
  protected visible = signal(false);

  constructor() {
    effect(() => {
      const toast = this.toastService.toast();

      if (toast) {
        // Enter
        this.visible.set(true);

        // Stay visible until
        setTimeout(() => {
          // Exit
          this.visible.set(false);

          // Wait for exit animation, then remove toast
          setTimeout(() => this.toastService.hide(), 300);
        }, 3000);
      }
    });
  }
}
