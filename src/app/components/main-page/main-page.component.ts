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

    const filter: { [key: string]: number | string } = Object.entries(this.filtersForm.value)
        .filter((item: [ string, number | string ]) => item[1])
        .reduce((acc: any, current: any) => {
          switch (current[0]) {
            case 'minPrice':
              acc['price'] ?
                acc['price'] = current[1] + acc['price'] :
                acc['price'] = current[1];
              break;

            case 'maxPrice':
              acc['price'] ?
                acc['price'] += 'to' + current[1] :
                acc['price'] = 'to' + current[1];
              break;

            default:
              acc[current[0]] = current[1];
          }

          return acc;
        }, Object.create(null));

    console.log(filter);

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
