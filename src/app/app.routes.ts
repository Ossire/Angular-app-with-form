import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Productcard } from './productcard/productcard';
import { Notfound } from './notfound/notfound';
import { Productdetail } from './productdetail/productdetail';
import { Cartcard } from './cartcard/cartcard';
import { ProductForm } from './product-form/product-form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Productcard },
  { path: 'products/new', component: ProductForm },
  { path: 'products/:id', component: Productdetail },
  { path: 'cart', component: Cartcard },
  { path: '**', component: Notfound },
];
