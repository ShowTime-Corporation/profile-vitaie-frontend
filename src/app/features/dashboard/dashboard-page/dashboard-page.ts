import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import {
  Award,
  Briefcase,
  Crown,
  LucideAngularModule,
  Mail,
  MapPin,
  User,
  SquarePen,
  School,
  ArrowRight,
} from 'lucide-angular';
import { AsyncPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../core/interfaces/user-profile';
import { ProfileService } from '../../../core/services/profile-service';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CvModalService } from '../../../core/services/cv-modal-service';
import { CvModal } from '../../../core/layout/modals/cv-modal/cv-modal';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    LucideAngularModule,
    SlicePipe,
    UpperCasePipe,
    TitleCasePipe,
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule,
    CvModal,
  ],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  // Inject services
  authService = inject(AuthService);
  profileService = inject(ProfileService);
  cvModalService = inject(CvModalService);

  // Lucide icons
  protected readonly SquarePen = SquarePen;
  protected readonly Mail = Mail;
  protected readonly Crown = Crown;
  protected readonly User = User;
  protected readonly Award = Award;
  protected readonly MapPin = MapPin;
  protected readonly Briefcase = Briefcase;
  protected readonly School = School;
  protected readonly ArrowRight = ArrowRight;

  // Get current user
  currentUser = this.authService.currentUser;
  userProfile$!: Observable<UserProfile>;

  // On init load user details
  ngOnInit(): void {
    this.userProfile$ = this.profileService.getUserProfile();
  }

  // Open CV modal
  openCvModal() {
    this.cvModalService.open();
  }
}
