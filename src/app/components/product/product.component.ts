import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product.model';
import {
  AuthorizationService,
  ProductsService,
  NotificationService,
  WishlistService,
  } from '../../services/';
import { User } from 'src/app/models/user';
import { Wishlist } from '../../models/wishlist.model';

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
    private activateRoute: ActivatedRoute,
    private notify: NotificationService,
    private renderer: Renderer2,
    private elementRef: ElementRef
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

    this.productsService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.carouselItems = products;
      },
      (err: any) => {/**/}
    );
  }

  positionAnimation(direction: number): void {
    const animationSpeed: number = 10;
    const shift: number = 150;
    const fps: number = 50;
    const position: number = parseInt(this.slide.nativeElement.style.left, 10);

    if (this.animationContinues) {
      return;
    }

    this.animationContinues = true;

    const timer: number = setInterval(() => {

      if (direction === -1) {
        if (this.position >= position + shift) {
          clearInterval(timer);
          this.animationContinues = false;
        } else {
          this.position += animationSpeed;
        }
      }

      if (direction === 1) {
        if (this.position <= position - shift) {
          clearInterval(timer);
          this.animationContinues = false;
        } else {
          this.position -= animationSpeed;
        }
      }

    }, 1000 / fps);
  }

  prev(): void {
    this.positionAnimation(1);
  }

  next(): void {
    this.positionAnimation(-1);
  }

  linkClick(id: string): void {
    this.id = id;
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

}
