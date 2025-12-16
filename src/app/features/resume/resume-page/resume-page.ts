import { Component, inject, signal, OnInit } from '@angular/core';
import { ContentCard } from '../../components/content-card/content-card';
import { AuthService } from '../../../core/services/auth-service';
import { ResumeService } from '../services/resume-service';
import { Resume } from '../interfaces/resume';
import { ToastService } from '../../../core/services/toast-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-resume-page',
  imports: [ContentCard],
  templateUrl: './resume-page.html',
})
export class ResumePage implements OnInit {
  // Inject services
  authService = inject(AuthService);
  resumeService = inject(ResumeService);
  toastService = inject(ToastService);

  // Get logged user
  user = this.authService.currentUser;

  // Loading state
  isLoading = signal(true);

  // Resume interface
  resume?: Resume;

  // Fetch resume data
  ngOnInit(): void {
    this.resumeService
      .getResume()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (r) => {
          this.resume = {
            ...r,
            resumeInfo: this.parseMarkdown(r.resumeInfo),
            employability: this.parseMarkdown(r.employability),
            simple: this.parseMarkdown(r.simple),
            recommendation: this.parseMarkdown(r.recommendation),
          };
          console.log(r);
        },
        error: () => {
          this.toastService.show('Resume data not found.', 'error');
        },
      });
  }

  private parseMarkdown(text: string): string {
    if (!text) {
      return '';
    }
    return text
      .replace(/\*\s*(.*?)\n/g, '<ul><li>$1</li></ul>')
      .replace(/<\/ul><ul>/g, '')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }
}
