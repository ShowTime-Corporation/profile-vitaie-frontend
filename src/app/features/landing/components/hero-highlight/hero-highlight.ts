import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-highlight',
  imports: [],
  templateUrl: './hero-highlight.html',
})
export class HeroHighlight {
  // Component inputs
  @Input() title!: string;
  @Input() subtitle!: string;
}
