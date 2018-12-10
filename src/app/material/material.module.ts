import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule
    } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
