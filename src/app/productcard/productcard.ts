import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service';
import { Product } from '../models/model';
import { RouterLink } from '@angular/router';
import { ErrorService } from '../services/error-service';
import { StateService } from '../services/state-service';
import { AsyncPipe, CommonModule, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-productcard',
  imports: [RouterLink, AsyncPipe, CommonModule],
  templateUrl: './productcard.html',
  styleUrl: './productcard.css',
})
export class Productcard implements OnInit {
  products$;
  loading$;
  error$;

  constructor(
    public productService: ProductService,
    public stateService: StateService,
    private errorHandler: ErrorService,
  ) {
    this.products$ = this.stateService.filteredArray$;
    this.loading$ = this.stateService.loading$;
    this.error$ = this.stateService.error$;
  }

  ngOnInit(): void {
    this.productService.getAllProducts();
  }

  addToCart(product: Product) {
    this.stateService.setToCart(product);
  }

  trackById(index: number, product: Product) {
    return product.id;
  }
  remove(id: number) {
    this.stateService.removeFromCart(id);
  }

  reTry() {
    this.productService.getAllProducts();
  }
}
