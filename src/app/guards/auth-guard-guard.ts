import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('GUARD STARTS');
  if (authService.isLoggedIn()) {
    console.log('page loading');
    return true;
  } else {
    console.log('page data cannot show');
    router.navigate(['/login']);

    return false;
  }
};
