import { Component } from '@angular/core';
import { PricingCard } from '../../components/pricing-card/pricing-card';

@Component({
  selector: 'app-pricing',
  imports: [PricingCard],
  templateUrl: './pricing.html',
})
export class Pricing {}
