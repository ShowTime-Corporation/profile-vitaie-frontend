import { Component, inject } from '@angular/core';
import { ContentCard } from '../../components/content-card/content-card';
import { AuthService } from '../../../core/services/auth-service';
import { ResumeService } from '../services/resume-service';
import { Resume } from '../interfaces/resume';

@Component({
  selector: 'app-resume-page',
  imports: [ContentCard],
  templateUrl: './resume-page.html',
})
export class ResumePage {
  // Inject services
  authService = inject(AuthService);
  resumeService = inject(ResumeService);

  // Get logged user
  user = this.authService.currentUser;

  // Resume interface
  resume?: Resume;

  // Fetch resume data
  ngOnInit() {
    const userId = this.authService.currentUser()?.id;
    this.resumeService.getResumeByUserId(userId!).subscribe((r) => {
      this.resume = r;
    });
  }
}
