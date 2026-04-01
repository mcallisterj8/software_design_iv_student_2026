import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

/**
 * This route guard runs before Angular allows navigation to a protected route.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  /**
   * Ask the AuthService whether the user currently appears to be logged in.
   */
  if (authService.hasValidToken()) {
    return true;
  }

  /**
   * If the token is missing or no longer valid, clear any old auth data.
   */
  authService.logout();

  /**
   * Return a UrlTree that tells Angular where to redirect instead.
   * We send the user to the login page and include the original URL
   * so we can optionally navigate them back after a successful login.
   *
   * The createUrlTree() builds a redirect target to /auth/login,
   * attaches a query string like ?redirectURL=/products/5
   * and lets Angular cancel the current navigation and redirect
   * there instead us doing it manually.
   */
  return router.createUrlTree(['/auth', 'login'], {
    queryParams: {
      redirectURL: state.url,
    },
  });
};
