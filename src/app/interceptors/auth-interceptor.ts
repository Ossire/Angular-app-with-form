import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';

import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    const authService = inject(AuthService);

    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          authService.loggedOut();
        }

        return throwError(() => error);
      }),
    );
  }

  return next(req);
};
