import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-card',
  imports: [],
  templateUrl: './content-card.html',
})
export class ContentCard {
  @Input() title!: string;
  @Input() content!: string;
}
