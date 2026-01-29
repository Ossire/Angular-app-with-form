import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-searchinput',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searchinput.html',
  styleUrl: './searchinput.css',
})
export class Searchinput {
  get searchedProduct(): string {
    return this.productService.searchedProduct();
  }

  set searchedProduct(value: string) {
    this.productService.searchedProduct.set(value);
  }

  constructor(private productService: ProductService) {}

  onSearchBegins() {
    this.productService.filterMyArrays();
  }
}
