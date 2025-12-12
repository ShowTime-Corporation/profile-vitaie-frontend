import { Component, inject } from '@angular/core';
import { Crown, LucideAngularModule, Sparkles, Target, TrendingUp } from 'lucide-angular';
import { UpgradeHighlight } from '../components/upgrade-highlight/upgrade-highlight';
import { UpgradeCard } from '../components/upgrade-card/upgrade-card';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-upgrade-page',
  imports: [LucideAngularModule, UpgradeHighlight, UpgradeCard],
  templateUrl: './upgrade-page.html',
})
export class UpgradePage {
  authService = inject(AuthService);

  protected readonly Sparkles = Sparkles;
  protected readonly Crown = Crown;
  protected readonly Target = Target;
  protected readonly TrendingUp = TrendingUp;
}
