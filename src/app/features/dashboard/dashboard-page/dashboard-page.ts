import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { Award, Briefcase, Crown, FileText, Link, LucideAngularModule, Mail, MapPin, User, PenBoxIcon } from 'lucide-angular';
import { AsyncPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../core/interfaces/user-profile';
import { ProfileService } from '../../../core/services/profile-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [LucideAngularModule, SlicePipe, UpperCasePipe, TitleCasePipe, AsyncPipe, RouterLink],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage implements OnInit {
  // Inject services
  authService = inject(AuthService);
  profileService = inject(ProfileService);

  // Get current user
  currentUser = this.authService.currentUser;
  userProfile$!: Observable<UserProfile>;

  protected readonly Edit = PenBoxIcon;
  protected readonly Mail = Mail;
  protected readonly Crown = Crown;
  protected readonly User = User;
  protected readonly Award = Award;
  protected readonly MapPin = MapPin;
  protected readonly Briefcase = Briefcase;
  protected readonly Link = Link;
  protected readonly FileText = FileText;

  ngOnInit(): void {
    this.userProfile$ = this.profileService.getUserProfile();
  }
}
