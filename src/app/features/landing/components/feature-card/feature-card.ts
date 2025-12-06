import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-feature-card',
  imports: [LucideAngularModule],
  templateUrl: './feature-card.html',
})
export class FeatureCard {
  // Component inputs
  @Input() icon!: LucideIconData;
  @Input() title!: string;
  @Input() paragraph!: string;
}
