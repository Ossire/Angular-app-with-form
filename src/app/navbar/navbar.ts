import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Searchinput } from '../searchinput/searchinput';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [Searchinput, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public productService: ProductService) {}
}
