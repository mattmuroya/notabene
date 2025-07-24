import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Return true if authenticated; otherwise redirect to login
  return authService.isAuthenticated().pipe(
    // If authentication status valid, continue; else return UrlTree object for redirect
    map((authenticated) => (authenticated ? true : router.parseUrl('/login')))
  );
  // No subscription - Angular Router subscribes guard Observable automatically
};
