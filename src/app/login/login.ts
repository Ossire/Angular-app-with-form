import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  state;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.state = this.authService.loginStatus;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email!;
      this.authService.logIn(email);
      this.router.navigate(['/products']);
    }
  }

  hasError(field: string, error: string): boolean {
    const control = this.loginForm.get(field);
    return control ? control.hasError(error) && control.touched : false;
  }
}
