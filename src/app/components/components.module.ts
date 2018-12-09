import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    ProductComponent,
  ]
})
export class ComponentsModule { }
