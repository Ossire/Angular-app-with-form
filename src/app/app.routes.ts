import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Productcard } from './productcard/productcard';
import { Notfound } from './notfound/notfound';
import { Productdetail } from './productdetail/productdetail';
import { Cartcard } from './cartcard/cartcard';
import { ProductForm } from './product-form/product-form';
import { Login } from './login/login';
import { authGuard } from './guards/auth-guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: Productcard, canActivate: [authGuard] },
  { path: 'products/new', component: ProductForm, canActivate: [authGuard] },
  { path: 'products/:id', component: Productdetail, canActivateChild: [authGuard] },
  { path: 'login', component: Login },
  { path: 'cart', component: Cartcard, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' },
];
