import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private productsService: ProductsService, private activateRoute: ActivatedRoute, private router: Router) {
    const urlArr: string[] = this.router.url.split('/');
    this.id = urlArr[urlArr.length - 1];
  }

  ngOnInit(): void {
    this.productsService.getProductById(this.id).subscribe(
      (product: Product) => {
        this.product = product;
        console.log(this.product);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
