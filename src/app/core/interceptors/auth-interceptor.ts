import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  const isAuthRequest = req.url.includes('/auth/login') || req.url.includes('/auth/register');

  // Skip adding Authorization header to login/register
  const authReq =
    token && !isAuthRequest
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Automatically logout on 401 (token expired / invalid)
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/']);
      }

      return throwError(() => error);
    }),
  );
};
