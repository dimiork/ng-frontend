import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,

    MatInputModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    FormsModule,

    MatInputModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class MaterialModule { }
