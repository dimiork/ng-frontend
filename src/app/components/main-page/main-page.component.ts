import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  private products: Product[];

  constructor(private productsService: ProductsService) {
    this.products = [];
  }

  public ngOnInit(): void {
    this.productsService.getAllProducts().
      subscribe((products: Product[]) => {
        this.products = products;
      });
  }

}
