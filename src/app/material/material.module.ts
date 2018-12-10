import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,

    MatInputModule
  ],
  exports: [
    FormsModule,

    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
