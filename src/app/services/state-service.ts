import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Product } from '../models/model';
import { toObservable } from '@angular/core/rxjs-interop';

interface Appstate {
  products: Product[];
  selectedProduct: Product | null;
  cart: Product[];
  loading: boolean;
  error: string | null;
  inCart: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  state = new BehaviorSubject<Appstate>({
    products: [],
    selectedProduct: null,
    cart: [],
    loading: false,
    error: null,
    inCart: false,
  });

  state$ = this.state.asObservable();

  searchedText = signal<string>('');
  searchedText$ = toObservable(this.searchedText);

  products$ = this.state$.pipe(map((s) => s.products));
  selectedProduct$ = this.state$.pipe(map((s) => s.selectedProduct));
  loading$ = this.state$.pipe(map((s) => s.loading));
  error$ = this.state$.pipe(map((s) => s.error));
  cartLenght = this.state$.pipe(map((s) => s.cart.length));
  cart$ = this.state$.pipe(map((s) => s.cart));
  inInCart = this.state$.pipe(map((s) => s.inCart));

  filteredArray$ = combineLatest([this.searchedText$, this.products$]).pipe(
    map(([text, product]) =>
      product.filter((p) => p.name.toLowerCase().includes(text.toLowerCase())),
    ),
  );

  get appState() {
    return this.state.getValue();
  }

  setLoading(isLoading: boolean) {
    this.state.next({ ...this.appState, loading: isLoading });
  }

  setProducts(products: Product[]) {
    this.state.next({ ...this.appState, products, loading: false });
  }
  setProduct(product: Product) {
    this.state.next({ ...this.appState, selectedProduct: product });
  }

  setError(error: string) {
    this.state.next({ ...this.appState, error: error });
  }

  clearError() {
    this.state.next({ ...this.appState, error: null });
  }

  setToCart(product: Product) {
    const currentValue = this.appState.cart;
    const alreadyInCart = currentValue.some((item) => item.id === product.id);

    if (alreadyInCart) {
      return;
    }

    this.state.next({ ...this.appState, cart: [...currentValue, product] });
  }

  setSearchedText(value: string) {
    this.searchedText.set(value);
  }
  removeFromCart(productId: number) {
    const latestCart = this.appState.cart.filter((p) => p.id !== productId);

    this.state.next({ ...this.appState, cart: latestCart });
  }

  setIsItInCart(productId: number) {
    return this.appState.cart.some((item) => item.id === productId);
  }
}
