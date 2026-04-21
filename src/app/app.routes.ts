import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard-guard';
import { publicOnlyGuard } from './guards/public-only-guard';
export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./productcard/productcard').then((m) => m.Productcard),
    canActivate: [authGuard],
  },
  {
    path: 'products/new',
    loadComponent: () => import('./product-form/product-form').then((m) => m.ProductForm),
    canActivate: [authGuard],
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./productdetail/productdetail').then((m) => m.Productdetail),
    canActivate: [authGuard],
  },

  {
    path: 'signup',
    loadComponent: () => import('./signup/signup').then((m) => m.Signup),
    canActivate: [publicOnlyGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
    canActivate: [publicOnlyGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./cartcard/cartcard').then((m) => m.Cartcard),
    canActivate: [authGuard],
  },
  {
    path: 'notfound',
    loadComponent: () => import('./notfound/notfound').then((m) => m.Notfound),
  },
  {
    path: '**',
    loadComponent: () => import('./notfound/notfound').then((m) => m.Notfound),
  },
];
