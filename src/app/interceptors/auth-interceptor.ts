import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const email = localStorage.getItem('userEmail');

  if (email) {
    const cloneReq = req.clone({
      setHeaders: { 'X-User-Email': email },
    });

    return next(cloneReq);
  }

  return next(req);
};
