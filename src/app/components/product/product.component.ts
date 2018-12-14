import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { flatMap } from 'rxjs/operators';

import { Product, User, Wishlist } from '../../models/';
import {
  AuthorizationService,
  ProductsService,
  NotificationService,
  WishlistService,
  } from '../../services/';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: Product = null;
  id: string;

  idProduct: string;
  user: User;
  products: Product[];
  updateWishlist: Wishlist;
  @ViewChild('slide') slide: ElementRef;
  carouselItems: Product[];
  position: number = 0;
  animationContinues: boolean = false;

  constructor(
    private productsService: ProductsService,
    private wishlistService: WishlistService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private notify: NotificationService,
    private elementRef: ElementRef
  ) {
    const arrLength: number = this.activateRoute.url['value'].length;
    this.id = this.activateRoute.url['value'][arrLength - 1].path;

// <<<<<<< HEAD
//   ngOnInit(): void {

//     this.productsService.getProductById(this.id).subscribe(
// =======
    activateRoute.params.pipe(
      flatMap((value: any, index: number) => {
        return this.productsService.getProductById(this.id);
      })
    )
    .subscribe(
      (product: Product) => {
        this.product = product;
      },
      (err: any) => {
        this.notify.show(err);
      }
    );
  }

  ngOnInit(): void {
    this.productsService.getProductById(this.id).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (err: any) => {/**/}
    );

    this.wishlistService.getWishlistSubject()
      .subscribe((data: any) => this.products = data);

    this.authorizationService.getUser()
    .subscribe( (resp: User) => this.user = resp);

  }

  isFavorite (): boolean {
    if (!this.products) {
      return false;
    }

    return (this.searchIndex() === 0 || this.searchIndex() > 0);
  }

  setUpdateWishlist(): void {

    this.updateWishlist = {
      client: this.user,
      id: this.user.id,
      items: this.products
    };

    this.wishlistService.updateWishlist(this.user.id, this.updateWishlist)
      .subscribe();

  }

  searchIndex(): any {

    for (let i: number = 0; i < this.products.length; i++) {
      if (this.products[i].id === this.product.id) {

        return i;
      }
    }

    return false;

  }

  addOrRemoveProduct(): any  {

    if (!this.products) {
      return false;
    }

    if (!this.isFavorite()) {
      this.products.push(this.product);
      this.setUpdateWishlist();
    } else {
      this.products.splice( this.searchIndex(), 1 );
      this.setUpdateWishlist();
    }
  }

  openNewProduct(id: string): void {
    this.id = id;
    this.router.navigate(['products', id]);
  }

}
