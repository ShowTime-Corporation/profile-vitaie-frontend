import { Routes } from '@angular/router';
import { LandingPage } from './features/landing/landing-page/landing-page';
import { DashboardPage } from './features/dashboard/dashboard-page/dashboard-page';
import { authGuard } from './core/guards/auth-guard';
import { Empty } from './core/empty/empty';
import { rootRedirectGuard } from './core/guards/root-redirect-guard';
import { EditProfilePage } from './features/edit-profile/edit-profile-page/edit-profile-page';
import { SettingsPage } from './features/settings/settings-page/settings-page';
import { UpgradePage } from './features/upgrade/upgrade-page/upgrade-page';

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
    path: 'edit-profile',
    component: EditProfilePage,
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    component: SettingsPage,
    canActivate: [authGuard],
  },
  {
    path: 'upgrade',
    component: UpgradePage,
    canActivate: [authGuard],
  },
];
