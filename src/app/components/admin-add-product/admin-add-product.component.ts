import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss']
})
export class AdminAddProductComponent implements OnInit {
  newProductForm: FormGroup;
  submitted: boolean = false;

  get f(): any {
    return this.newProductForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService) { /**/
  }

  ngOnInit(): void {
    this.newProductForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(255)]],
      category_title: [''],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      thumbnail: ['']
    });
  }

  formOnSubmit(): void {
    const formValues: FormGroup = this.newProductForm.value;

    const newProduct: Product = {
      title: formValues['title'],
      description: formValues['description'],
      category_title: formValues['category_title'],
      price: formValues['price'],
      stock: formValues['stock'],
      thumbnail: formValues['thumbnail']
    };

    this.submitted = true;
    if (this.newProductForm.invalid) {
      return;
    }

    // this.productsService.createProduct(newProduct).subscribe(
    //   (next: any) => {/**/},
    //   (err: any) => {/**/}
    // );
  }
}
