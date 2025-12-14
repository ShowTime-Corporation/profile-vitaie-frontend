import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import {
  Award,
  Briefcase,
  Crown,
  FileText,
  Link,
  LucideAngularModule,
  Mail,
  MapPin,
  User,
  SquarePen,
  School,
} from 'lucide-angular';
import { AsyncPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../core/interfaces/user-profile';
import { ProfileService } from '../../../core/services/profile-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    LucideAngularModule,
    SlicePipe,
    UpperCasePipe,
    TitleCasePipe,
    AsyncPipe,
    RouterLink,
    KeyValuePipe,
  ],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage implements OnInit {
  // Inject services
  authService = inject(AuthService);
  profileService = inject(ProfileService);

  // Lucid icons
  protected readonly screen = screen;

  // Get current user
  currentUser = this.authService.currentUser;
  userProfile$!: Observable<UserProfile>;

  // Lucide icons
  protected readonly SquarePen = SquarePen;
  protected readonly Mail = Mail;
  protected readonly Crown = Crown;
  protected readonly User = User;
  protected readonly Award = Award;
  protected readonly MapPin = MapPin;
  protected readonly Briefcase = Briefcase;
  protected readonly Link = Link;
  protected readonly FileText = FileText;
  protected readonly School = School;

  // On init load user details
  ngOnInit(): void {
    this.userProfile$ = this.profileService.getUserProfile();
  }
}
