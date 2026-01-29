import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //pls ignore the notes all over the place, i added them to help me remember my code implementation whenever i want to relearn a concept

  //text being typed into input field & text that can prepopulate the input field(two way data binding)
  searchedProduct = signal<string>('');

  //cart counter
  cartCount = 0;

  //array to store clicked items object into the cart
  cartItems: Product[] = [];

  //array to store ids of clicked card object
  cartItemsId: number[] = [];

  //empty product array at beginning that shows before search filter method is applied
  private _product = signal<Product[]>([]);
  product = this._product.asReadonly();

  //array of objects to display when products are being searched for
  private _filteredArray = signal<Product[]>([]);
  filteredArray = this._filteredArray.asReadonly();

  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/products', product);
  }

  //fetches all products from the db.json file link
  getAllProducts() {
    this.http.get<Product[]>('http://localhost:3000/products').subscribe((data) => {
      this._product.set(data);
      this._filteredArray.set(this._product());
      //console.log(data);
    });
  }

  //fetch product for me by id placeholder
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  //method to call when a text is typed in the input field
  //it filters the array objects by name and returns the one true for the condition
  filterMyArrays() {
    this._filteredArray.set(
      this._product().filter((product) =>
        product.name.toLowerCase().includes(this.searchedProduct().toLowerCase()),
      ),
    );
  }

  //adds item object{} to cart array[{}] when clicked and also increases count
  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartItemsId.push(product.id);
    //this.cartCount.update((prev) => prev + 1);
    this.cartCount = this.cartItemsId.length;
  }

  //remove item from cart array using id
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((product) => product.id !== productId);
    this.cartItemsId = this.cartItemsId.filter((id) => id !== productId);
    this.cartCount = this.cartItemsId.length;
    //this.cartCount.update((prev) => prev - 1);
  }

  //if the cartItemsId Arrayid includes the id of card just clicked(product.id)
  isInCart(product: Product) {
    return this.cartItemsId.includes(product.id);
  }

  // isNotInCart(productId: Product) {
  //   return this.cartItems.filter((id) => id !== productId);
  // }
}
