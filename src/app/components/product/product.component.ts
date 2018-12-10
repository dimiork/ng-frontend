import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: Product = {
    title: 'string',
    description: 'string',
    category_title: 'string',
    price: 100,
    stock: 10,
    thumbnail: 'string'
  };

  id: string;

  constructor(private productsService: ProductsService, private activateRoute: ActivatedRoute) {
    const arrLength: number = this.activateRoute.url['value'].length;
    this.id = this.activateRoute.url['value'][arrLength - 1].path;
  }

  ngOnInit(): void {
    this.productsService.getProductById(this.id).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
