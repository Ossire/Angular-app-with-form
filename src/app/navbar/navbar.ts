import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Searchinput } from '../searchinput/searchinput';
import { ProductService } from '../services/product-service';
import { StateService } from '../services/state-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [Searchinput, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  cart$;
  constructor(
    public productService: ProductService,
    private stateService: StateService,
  ) {
    this.cart$ = this.stateService.cart$;
  }
}
