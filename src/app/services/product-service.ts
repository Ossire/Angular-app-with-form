import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/model';
import { catchError, finalize, map, Observable } from 'rxjs';
import { StateService } from './state-service';
import { ErrorService } from './error-service';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //pls ignore the notes all over the place, i added them to help me remember my code implementation whenever i want to relearn a concept

  //cart counter
  cartCount = 0;

  //array to store clicked items object into the cart
  cartItems: Product[] = [];

  //array to store ids of clicked card object
  cartItemsId: number[] = [];

  envFile = environment;
  constructor(
    private http: HttpClient,
    private stateService: StateService,
    private errorHandler: ErrorService,
  ) {}

  createProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.envFile.apiUrl, product)
      .pipe(catchError((error) => this.errorHandler.handleError(error)));
  }

  //fetches all products from the db.json file link
  getAllProducts() {
    this.stateService.setLoading(true);
    this.http
      .get<Product[]>(this.envFile.apiUrl)
      .pipe(
        catchError((error) => this.errorHandler.handleError(error)),
        finalize(() => this.stateService.setLoading(false)),
      )
      .subscribe({
        next: (data) => this.stateService.setProducts(data),
        error: (err) => {
          this.stateService.setError(err.message);
        },
      });
  }

  //fetch product for me by id placeholder
  getProductById(id: string) {
    this.stateService.setLoading(true);
    this.http
      .get<Product>(`${this.envFile.apiUrl}/${id}`)
      .pipe(
        catchError((error) => this.errorHandler.handleError(error)),
        finalize(() => this.stateService.setLoading(false)),
      )
      .subscribe({
        next: (data) => {
          this.stateService.setProduct(data);
        },
        error: (err) => {
          this.stateService.setError(err.message);
        },
      });
  }

  reloadProducts() {
    this.getAllProducts();
  }

  reloadProduct(id: string) {
    this.getProductById(id);
  }
  //remove item from cart array using id
  // removeFromCart(productId: number) {
  //   this.cartItems = this.cartItems.filter((product) => product.id !== productId);
  //   this.cartItemsId = this.cartItemsId.filter((id) => id !== productId);
  //   this.cartCount = this.cartItemsId.length;
  //   //this.cartCount.update((prev) => prev - 1);
  // }

  //if the cartItemsId Arrayid includes the id of card just clicked(product.id)
  // isInCart(product: Product) {
  //   return this.cartItemsId.includes(product.id);
  // }
}
