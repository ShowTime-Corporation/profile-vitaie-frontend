import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { RoadmapService } from '../services/roadmap-service';
import { Roadmap } from '../interfaces/roadmap';
import { ContentCard } from '../../components/content-card/content-card';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-roadmap-page',
  imports: [ContentCard],
  templateUrl: './roadmap-page.html',
})
export class RoadmapPage {
  // Inject services
  authService = inject(AuthService);
  roadmapService = inject(RoadmapService);
  toastService = inject(ToastService);

  // Get logged user
  user = this.authService.currentUser;

  // Roadmap interface
  roadmap?: Roadmap;

  // Fetch roadmap data
  ngOnInit() {
    this.roadmapService.getRoadmap().subscribe({
      next: (r) => {
        this.roadmap = r;
      },
      error: () => {
        this.toastService.show('Roadmap data not found.', 'error');
      },
    });
  }
}
