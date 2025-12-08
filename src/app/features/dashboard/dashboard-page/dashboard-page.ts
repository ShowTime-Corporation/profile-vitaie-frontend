import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { Crown, Edit, LucideAngularModule, Mail, User } from 'lucide-angular';
import { SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  imports: [LucideAngularModule, SlicePipe, UpperCasePipe, TitleCasePipe],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {
  authService = inject(AuthService);
  user = this.authService.currentUser;
  protected readonly Edit = Edit;
  protected readonly Mail = Mail;
  protected readonly Crown = Crown;
  protected readonly User = User;
}
