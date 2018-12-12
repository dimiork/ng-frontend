import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/categories';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss']
})
export class AdminAddProductComponent implements OnInit {
  newProductForm: FormGroup;
  submitted: boolean = false;

  categories: Category[];

  get formControls(): {[key: string]: AbstractControl} {
    return this.newProductForm.controls;
  }

  constructor(private formBuilder: FormBuilder,
              private productsService: ProductsService,
              private categoriesService: CategoriesService
  ) {/**/}

  ngOnInit(): void {
    this.newProductForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(255)]],
      category_title: ['', Validators.required],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      thumbnail: ['']
    });

    this.categoriesService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  formOnSubmit(): void {
    const newProduct: Product = this.newProductForm.value;

    this.submitted = true;
    if (this.newProductForm.invalid) {
      return;
    }

    this.productsService.createProduct(newProduct).subscribe(
      (next: any) => {/**/},
      (err: any) => {/**/}
    );
  }
}
