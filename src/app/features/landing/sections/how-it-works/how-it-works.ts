import { Component } from '@angular/core';
import { Map, Rocket, ScanSearch, UserPlus } from 'lucide-angular';
import { StepCard } from '../../components/step-card/step-card';

@Component({
  selector: 'app-how-it-works',
  imports: [StepCard],
  templateUrl: './how-it-works.html',
})
export class HowItWorks {
  // Lucide icons
  protected readonly UserPlus = UserPlus;
  protected readonly ScanSearch = ScanSearch;
  protected readonly Map = Map;
  protected readonly Rocket = Rocket;
}
