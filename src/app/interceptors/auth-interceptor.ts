import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor fired');
  console.log('Request url:', req.url);
  const email = localStorage.getItem('userEmail');

  if (email) {
    const cloneReq = req.clone({
      setHeaders: { 'X-User-Email': 'userEmail' },
    });

    return next(cloneReq);
  }

  return next(req);
};
