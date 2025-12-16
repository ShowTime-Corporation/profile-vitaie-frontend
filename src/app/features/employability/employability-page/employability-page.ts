import { Component, inject } from '@angular/core';
import { ContentCard } from '../../components/content-card/content-card';
import { AuthService } from '../../../core/services/auth-service';
import { EmployabilityService } from '../services/employability-service';
import { Employability } from '../interfaces/employability';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-employability-page',
  imports: [ContentCard],
  templateUrl: './employability-page.html',
})
export class EmployabilityPage {
  // Inject services
  authService = inject(AuthService);
  employabilityService = inject(EmployabilityService);
  toastService = inject(ToastService);

  // Get logged user
  user = this.authService.currentUser;

  // Employability interface
  employability?: Employability;

  // Fetch resume data
  ngOnInit() {
    this.employabilityService.getEmployability().subscribe({
      next: (r) => {
        this.employability = r;
      },
      error: () => {
        this.toastService.show('Employability data not found.', 'error');
      },
    });
  }
}
