import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticated.asObservable();

  constructor(private router: Router) {}

  logIn(email: string) {
    localStorage.setItem('userEmail', email);
    this.isAuthenticated.next(true);
  }

  get loginStatus() {
    return this.isAuthenticated.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('userEmail');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  get emailValue() {
    return localStorage.getItem('userEmail');
  }

  loggedOut() {
    localStorage.removeItem('userEmail');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
    console.log(this.isAuthenticated.value);
  }
}
