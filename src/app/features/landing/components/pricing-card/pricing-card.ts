import { Component, Input } from '@angular/core';
import { Check, LucideAngularModule, Sparkles } from 'lucide-angular';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pricing-card',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './pricing-card.html',
})
export class PricingCard {
  // Lucide icons
  protected readonly Check = Check;
  protected readonly Sparkles = Sparkles;

  // Component inputs
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() price!: string;
  @Input() billingPeriod!: string;
  @Input() features!: string[];
  @Input() buttonText!: string;
  @Input() highlight = false;
}
