import { Component, inject } from '@angular/core';
import { AuthModalService } from '../../../../../../../profile-vitaie-client/src/app/core/services/auth-modal-service';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';

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
