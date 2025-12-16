import { Component, inject, OnInit, signal } from '@angular/core';
import { ContentCard } from '../../components/content-card/content-card';
import { AuthService } from '../../../core/services/auth-service';
import { EmployabilityService } from '../services/employability-service';
import { Employability } from '../interfaces/employability';
import { ToastService } from '../../../core/services/toast-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-employability-page',
  imports: [ContentCard],
  templateUrl: './employability-page.html',
})
export class EmployabilityPage implements OnInit {
  // Inject services
  authService = inject(AuthService);
  employabilityService = inject(EmployabilityService);
  toastService = inject(ToastService);

  // Get logged user
  user = this.authService.currentUser;

  // Loading state
  isLoading = signal(true);

  // Employability interface
  employability?: Employability;

  // Fetch resume data
  ngOnInit() {
    this.employabilityService
      .getEmployability()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (r) => {
          this.employability = {
            ...r,
            techOffer: this.parseMarkdown(r.techOffer),
            educationOffer: this.parseMarkdown(r.educationOffer),
            companyOffer: this.parseMarkdown(r.companyOffer),
          };
        },
        error: () => {
          this.toastService.show('Employability data not found.', 'error');
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
