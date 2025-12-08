import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-upgrade-highlight',
  imports: [LucideAngularModule],
  templateUrl: './upgrade-highlight.html',
})
export class UpgradeHighlight {
  @Input() icon!: LucideIconData;
  @Input() title!: string;
  @Input() paragraph!: string;
}
