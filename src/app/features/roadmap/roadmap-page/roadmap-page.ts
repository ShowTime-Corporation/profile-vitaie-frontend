import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { RoadmapService } from '../services/roadmap-service';
import { Roadmap } from '../interfaces/roadmap';
import { ContentCard } from '../../components/content-card/content-card';

@Component({
  selector: 'app-roadmap-page',
  imports: [ContentCard],
  templateUrl: './roadmap-page.html',
})
export class RoadmapPage {
  // Inject services
  authService = inject(AuthService);
  roadmapService = inject(RoadmapService);

  // Roadmap interface
  roadmap?: Roadmap;

  // Fetch roadmap data
  ngOnInit() {
    const userId = this.authService.currentUser()?.id;
    this.roadmapService.getRoadmapByUserId(userId!).subscribe((r) => {
      this.roadmap = r;
    });
  }
}
