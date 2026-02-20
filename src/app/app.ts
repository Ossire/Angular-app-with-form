import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Login } from './login/login';
import { AuthService } from './services/auth-service';
import { AsyncPipe } from '@angular/common';
import { NotFound } from '@angular/core/primitives/di';
import { Notfound } from './notfound/notfound';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('seamfix-angular-app');

  authService = inject(AuthService);

  isauthenticated$ = this.authService.isAuthenticated$;
}
