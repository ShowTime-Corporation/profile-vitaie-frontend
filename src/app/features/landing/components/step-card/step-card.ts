import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-step-card',
  imports: [LucideAngularModule],
  templateUrl: './step-card.html',
})
export class StepCard {
  // Component inputs
  @Input() step!: string;
  @Input() icon!: LucideIconData;
  @Input() title!: string;
  @Input() paragraph!: string;
}
