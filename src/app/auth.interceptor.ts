import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('jwt');

  const isTokenExpired = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Math.floor(Date.now() / 1000) >= payload.exp;
    } catch {
      return true;
    }
  };

  let authReq = req;

  if (token) {
    if (!isTokenExpired(token)) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    } else {
      localStorage.removeItem('jwt');
      alert('Session expired. Please login again.');
    }
  }

  return next(authReq);
};
