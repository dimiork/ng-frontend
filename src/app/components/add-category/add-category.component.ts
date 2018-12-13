import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  newCategoryForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private productService: ProductsService) { /**/
  }

  ngOnInit(): void {
    this.newCategoryForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(255)]]
    });
  }

  get formControls(): {[key: string]: AbstractControl} {
    return this.newCategoryForm.controls;
  }

  formOnSubmit(): void {
    const newCategory: Category = this.newCategoryForm.value;

    this.submitted = true;
    if (this.newCategoryForm.invalid) {
      return;
    }

    console.log(newCategory);
    this.productService.createCategory(newCategory).subscribe(
      (next: any) => {/**/},
      (err: any) => {/**/}
    );
  }

}
