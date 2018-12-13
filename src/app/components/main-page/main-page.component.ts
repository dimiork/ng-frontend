import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { ProductsService } from '../../services/products.service';
// import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  public products$: Observable<Product[]>;
  public categories$: Observable<string[]>;

  minPrice: FormControl;
  maxPrice: FormControl;
  stock: FormControl;
  category: FormControl;
  filtersForm: FormGroup;

  constructor(
    private productsService: ProductsService,
    // private orderService: OrderService,
  ) {
    this.products$ = this.productsService.getAllProducts();
    this.categories$ = this.productsService.getCategories();

    this.filtersForm = new FormGroup({
      minPrice: new FormControl(''),
      maxPrice: new FormControl(''),
      stock: new FormControl(''),
      category: new FormControl('')
    });
  }

  public getFilteredProducts(): void {

    const filter: { [key: string]: number | string } = {};
    const params: { [key: string]: number | string } = this.filtersForm.value;

    Object.keys(params)
      .filter((item: number | string) => params[item])
      .forEach((item: number | string) => {
        switch (item) {
          case 'minPrice':
            filter.price = params[item];
            break;
          case 'maxPrice':
            filter.price += 'to' + params[item];
            break;
          default:
            filter[item] = params[item];
        }
      });

    this.products$ = this.productsService.getAllProducts(filter);
  }

  public onResetFilters(): void {
    this.filtersForm.reset();
    this.products$ = this.productsService.getAllProducts();
  }

  public onAddToCart(product: Product, evt: any): void {
    if (evt && product) {
      evt.stopPropagation();
      // this.orderService.createOrder(product);
    }
  }

}
