import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product-service';
import { Product } from '../models/model';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public router: Router,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(50)]],
      category: ['', Validators.required],
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

  onSubmit() {
    if (this.form.invalid) {
      this.markAllTouched(this.form);
      return;
    }

    const raw = this.form.value;
    const newProduct: Product = {
      id: 0,
      name: raw.name,
      description: raw.description,
      price: Number(raw.price),
      category: raw.category,
      imageUrl: raw.imageUrl,
      inStock: raw.inStock,
      rating: Number(raw.rating),
      properties: raw.properties,
    };

    this.productService.createProduct(newProduct).subscribe({
      next: (created) => {
        alert('Product created successfully ');
        this.form.reset({
          name: '',
          description: '',
          price: null,
          category: '',
          imageUrl: '',
          inStock: true,
          rating: 0,
          properties: [{ color: '', weight: '' }],
        });

        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to create product.');
      },
    });
  }
}
