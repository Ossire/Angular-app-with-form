import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/model';
import { CommonModule } from '@angular/common';
import { StateService } from '../services/state-service';
import { AsyncPipe } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-productdetail',
  imports: [CommonModule, AsyncPipe, NgIf],
  templateUrl: './productdetail.html',
  styleUrl: './productdetail.css',
})
export class Productdetail implements OnInit, OnDestroy {
  product$;
  loading$;
  error$;
  category?: string;
  productId!: string;

  constructor(
    public productService: ProductService,
    public stateService: StateService,
    private route: ActivatedRoute,
  ) {
    this.product$ = this.stateService.selectedProduct$;
    this.loading$ = this.stateService.loading$;
    this.error$ = this.stateService.error$;
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') as string;

    this.category = this.route.snapshot.queryParamMap.get('category') || undefined;

    this.productService.getProductById(this.productId);
  }

  ngOnDestroy(): void {
    this.stateService.clearError();
  }

  addToCart(product: Product) {
    this.stateService.setToCart(product);
  }

  remove(id: string) {
    this.stateService.removeFromCart(id);
  }

  reTry(id: string) {
    this.productService.getProductById(id);
  }
}
