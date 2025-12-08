import { Routes } from '@angular/router';
import { LandingPage } from './features/landing/landing-page/landing-page';
import { DashboardPage } from './features/dashboard/dashboard-page/dashboard-page';
import { authGuard } from './core/guards/auth-guard';
import { Empty } from './core/empty/empty';
import { rootRedirectGuard } from './core/guards/root-redirect-guard';
import { EditProfilePage } from './features/edit-profile/edit-profile-page/edit-profile-page';
import { UpgradePage } from './features/upgrade/upgrade-page/upgrade-page';
import { ResumePage } from './features/resume/resume-page/resume-page';
import { EmployabilityPage } from './features/employability/employability-page/employability-page';
import { RoadmapPage } from './features/roadmap/roadmap-page/roadmap-page';

export const routes: Routes = [
  {
    path: '',
    canActivate: [rootRedirectGuard],
    component: Empty,
  },
  {
    path: 'landing',
    component: LandingPage,
  },
  {
    path: 'dashboard',
    component: DashboardPage,
    canActivate: [authGuard],
  },
  {
    path: 'roadmap',
    component: RoadmapPage,
    canActivate: [authGuard],
  },
  {
    path: 'resume',
    component: ResumePage,
    canActivate: [authGuard],
  },
  {
    path: 'employability',
    component: EmployabilityPage,
    canActivate: [authGuard],
  },
  {
    path: 'edit-profile',
    component: EditProfilePage,
    canActivate: [authGuard],
  },
  {
    path: 'upgrade',
    component: UpgradePage,
    canActivate: [authGuard],
  },
];
