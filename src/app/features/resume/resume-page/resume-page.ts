import { Component, inject } from '@angular/core';
import { ContentCard } from '../../components/content-card/content-card';
import { AuthService } from '../../../core/services/auth-service';
import { ResumeService } from '../services/resume-service';
import { Resume } from '../interfaces/resume';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-resume-page',
  imports: [ContentCard],
  templateUrl: './resume-page.html',
})
export class ResumePage {
  // Inject services
  authService = inject(AuthService);
  resumeService = inject(ResumeService);
  toastService = inject(ToastService);

  // Get logged user
  user = this.authService.currentUser;

  // Resume interface
  resume?: Resume;

  // Fetch resume data
  ngOnInit() {
    this.resumeService.getResume().subscribe({
      next: (r) => {
        this.resume = r;
      },
      error: () => {
        this.toastService.show('Resume data not found.', 'error');
      },
    });
  }
}
