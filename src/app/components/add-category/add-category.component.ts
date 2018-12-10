import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  newCategoryForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoriesService) { /**/
  }

  ngOnInit(): void {
    this.newCategoryForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(255)]]
    });
  }

  get f(): any {
    return this.newCategoryForm.controls;
  }

  formOnSubmit(): void {
    const formValues: FormGroup = this.newCategoryForm.value;

    const newCategory: Category = {
      title: formValues['title'],
      description: formValues['description'],
    };

    this.submitted = true;
    if (this.newCategoryForm.invalid) {
      return;
    }

    console.log(newCategory);
    this.categoryService.createCategory(newCategory).subscribe(
      (next: any) => {/**/},
      (err: any) => {/**/}
    );
  }

}
