import { Component } from '@angular/core';
import { Hero } from '../sections/hero/hero';
import { Features } from '../sections/features/features';
import { HowItWorks } from '../sections/how-it-works/how-it-works';
import { Pricing } from '../sections/pricing/pricing';
import { Cta } from '../sections/cta/cta';

@Component({
  selector: 'app-landing-page',
  imports: [Hero, Features, HowItWorks, Pricing, Cta],
  templateUrl: './landing-page.html',
})
export class LandingPage {}
