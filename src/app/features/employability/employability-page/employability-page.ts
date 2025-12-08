import { Component, inject } from '@angular/core';
import { ContentCard } from '../../components/content-card/content-card';
import { AuthService } from '../../../core/services/auth-service';
import { Resume } from '../../resume/interfaces/resume';
import { EmployabilityService } from '../services/employability-service';
import { Employability } from '../interfaces/employability';

@Component({
  selector: 'app-employability-page',
  imports: [ContentCard],
  templateUrl: './employability-page.html',
})
export class EmployabilityPage {
  // Inject services
  authService = inject(AuthService);
  employabilityService = inject(EmployabilityService);

  // Get logged user
  user = this.authService.currentUser;

  // Employability interface
  employability?: Employability;

  // Fetch resume data
  ngOnInit() {
    const userId = this.authService.currentUser()?.id;
    this.employabilityService.getEmployabilityByUserId(userId!).subscribe((r) => {
      this.employability = r;
    });
  }
}
