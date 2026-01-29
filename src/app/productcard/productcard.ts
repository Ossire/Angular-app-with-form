import {
  Component,
  EventEmitter,
  Input,
  Output,
  Injectable,
  OnInit,
  computed,
} from '@angular/core';
import { ProductService } from '../services/product-service';
import { Product } from '../models/model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productcard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './productcard.html',
  styleUrl: './productcard.css',
})
export class Productcard implements OnInit {
  myArray = computed(() => this.productService.filteredArray());

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts();
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
