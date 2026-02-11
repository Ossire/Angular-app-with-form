import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor fired');
  console.log('Request url:', req.url);
  const email = localStorage.getItem('userEmail');
  console.log('user email', email);
  if (email) {
    const cloneReq = req.clone({
      setHeaders: { 'X-User-Email': 'userEmail' },
    });
    console.log('Header added');
    console.log('Modified headers:', cloneReq.headers.keys());
    return next(cloneReq);
  }

  return next(req);
};
