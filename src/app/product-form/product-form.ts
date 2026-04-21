import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product-service';
import { Product, Category } from '../models/model';
import { StateService } from '../services/state-service';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  error$;
  form: FormGroup;
  categories = signal<Category[]>([]);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public router: Router,
    private stateService: StateService,
  ) {
    this.error$ = this.stateService.error$;
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(50)]],
      categoryId: [null, Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
      inStock: [true],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      properties: this.fb.array([this.createPropertyGroup()]),
    });
  }

  createPropertyGroup() {
    return this.fb.group({
      color: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  get properties(): FormArray {
    return this.form.get('properties') as FormArray;
  }

  addProperty() {
    this.properties.push(this.createPropertyGroup());
  }

  removeProperty(index: number) {
    if (this.properties.length > 1) {
      this.properties.removeAt(index);
    }
  }

  private markAllTouched(group: FormGroup | FormArray) {
    Object.values(group.controls).forEach((control) => {
      if (control instanceof FormArray || (control as FormGroup).controls) {
        this.markAllTouched(control as any);
      } else {
        control.markAsTouched();
      }
    });
  }

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        console.log(' SUCCESS! Data received:', data);
        this.categories.set(data);
      },
      error: (err) => {
        console.error('2. ERROR! Request failed:', err);
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.markAllTouched(this.form);
      return;
    }

    const raw = this.form.value;

    console.log('Raw Form Data:', raw);
    const newProduct: Product = {
      name: raw.name,
      description: raw.description,
      price: Number(raw.price),
      categoryId: Number(raw.categoryId),
      imageUrl: raw.imageUrl,
      inStock: raw.inStock,
      rating: Number(raw.rating),
      properties: raw.properties,
    };

    this.productService.createProduct(newProduct).subscribe({
      next: () => {
        alert('Product created successfully ');
        this.form.reset({
          name: '',
          description: '',
          price: null,
          categoryId: '',
          imageUrl: null,
          inStock: true,
          rating: 0,
          properties: [{ color: '', weight: '' }],
        });

        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.stateService.setError(err.message);
      },
    });
  }

  reTry() {
    this.stateService.clearError();
  }
}
