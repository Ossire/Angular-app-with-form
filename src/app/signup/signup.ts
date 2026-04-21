import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  errorMessage: string | null = null;
  router = inject(Router);
  authService = inject(AuthService);
  cdr = inject(ChangeDetectorRef);

  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor() {}

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signUp(this.signupForm.value).subscribe({
        next: () => {
          this.signupForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.message;
          if (err.message.includes('Email already exists')) {
            this.signupForm.get('email')?.setErrors({ emailExists: true });
          }
          this.cdr.detectChanges();
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
