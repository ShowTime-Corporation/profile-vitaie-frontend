import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { RoadmapService } from '../services/roadmap-service';
import { Roadmap } from '../interfaces/roadmap';
import { ContentCard } from '../../components/content-card/content-card';
import { ToastService } from '../../../core/services/toast-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-roadmap-page',
  imports: [ContentCard],
  templateUrl: './roadmap-page.html',
})
export class RoadmapPage implements OnInit {
  // Inject services
  authService = inject(AuthService);
  roadmapService = inject(RoadmapService);
  toastService = inject(ToastService);

  // Get logged user
  user = this.authService.currentUser;

  // Loading state
  isLoading = signal(true);

  // Roadmap interface
  roadmap?: Roadmap;

  // Fetch roadmap data
  ngOnInit() {
    this.roadmapService
      .getRoadmap()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (r) => {
          this.roadmap = {
            ...r,
            ideas: this.parseMarkdown(r.ideas),
          };
          console.log(r);
        },
        error: () => {
          this.toastService.show('Roadmap data not found.', 'error');
        },
      });
  }

  private parseMarkdown(text: string): string {
    return text
      .replace(/\*\s*(.*?)\n/g, '<ul><li>$1</li></ul>')
      .replace(/<\/ul><ul>/g, '')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }
}
