import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Check, Crown, LucideAngularModule, Zap } from 'lucide-angular';

@Component({
  selector: 'app-upgrade-card',
  imports: [NgClass, LucideAngularModule],
  templateUrl: './upgrade-card.html',
})
export class UpgradeCard {
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() paragraph: string = '';
  @Input() billingPeriod: string = '';
  @Input() features: string[] = [];
  @Input() buttonText: string = '';
  @Input() highlight: boolean = false;
  @Input() isCurrentPlan: boolean = false;
  protected readonly Zap = Zap;
  protected readonly Crown = Crown;
  protected readonly Check = Check;
}
