import { Component, computed } from '@angular/core';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-cartcard',
  imports: [],
  templateUrl: './cartcard.html',
  styleUrl: './cartcard.css',
})
export class Cartcard {
  productnames = computed(() => this.productService.cartItems);

  constructor(private productService: ProductService) {}
}
