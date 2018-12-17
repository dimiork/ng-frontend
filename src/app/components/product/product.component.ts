import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductsService, NotificationService } from '../../services/';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: Product = null;

  id: string;

  constructor(
    private productsService: ProductsService,
    private activateRoute: ActivatedRoute,
    private notify: NotificationService
  ) {
    const arrLength: number = this.activateRoute.url['value'].length;
    this.id = this.activateRoute.url['value'][arrLength - 1].path;
  }

  ngOnInit(): void {
    this.productsService.getProductById(this.id).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (err: any) => {
        this.notify.show(err);
      }
    );
  }
}
