import { Component, inject } from '@angular/core';
import { HeroHighlight } from '../../components/hero-highlight/hero-highlight';
import { ArrowRight, LucideAngularModule, Sparkles } from 'lucide-angular';
import { AuthModalService } from '../../../../../../../profile-vitaie-client/src/app/core/services/auth-modal-service';

@Component({
  selector: 'app-hero',
  imports: [HeroHighlight, LucideAngularModule],
  templateUrl: './hero.html',
})
export class Hero {
  // Inject modal service to call sign up form
  protected modal = inject(AuthModalService);

  // Lucide icons
  protected readonly ArrowRight = ArrowRight;
  protected readonly Sparkles = Sparkles;
}
