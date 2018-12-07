import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,

    MatInputModule,
    MatCardModule,
  ],
  exports: [
    FormsModule,

    MatInputModule,
    MatCardModule,
  ]
})
export class MaterialModule { }
