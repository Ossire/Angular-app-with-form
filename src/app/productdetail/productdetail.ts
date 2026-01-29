import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../services/product-service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productdetail',
  imports: [CommonModule],
  templateUrl: './productdetail.html',
  styleUrl: './productdetail.css',
})
export class Productdetail implements OnInit {
  product?: Product;
  category?: string;
  loading = signal<boolean>(true);
  error = signal<string>('');

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.category = this.route.snapshot.queryParamMap.get('category') || undefined;

    this.loading.set(true);
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Product not Found');
        this.loading.set(false);
      },
    });
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  removeFromCart(productId: number) {
    this.productService.removeFromCart(productId);
  }
}
