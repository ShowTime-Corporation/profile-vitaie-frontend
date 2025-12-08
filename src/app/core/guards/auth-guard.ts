import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is logged in based on token presence
  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to landing (or /login if you prefer)
  router.navigate(['/']);
  return false;
};
