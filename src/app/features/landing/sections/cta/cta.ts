import { Component, inject } from '@angular/core';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';
import { AuthModalService } from '../../../../core/services/auth-modal-service';

@Component({
  selector: 'app-cta',
  imports: [LucideAngularModule],
  templateUrl: './cta.html',
})
export class Cta {
  // Inject modal service to call sign up form
  protected modal = inject(AuthModalService);

  // Lucide icon
  protected readonly ArrowRight = ArrowRight;
}
