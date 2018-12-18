import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

import { WishlistService } from '../../services/wishlist.service';
import { Product } from 'src/app/models/product.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/models/user';
import { Wishlist } from 'src/app/models/wishlist.model';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {

// <<<<<<< HEAD
//   products$: Observable<Product[]>;
// =======
  products: Product[];
  updateWishlist: Wishlist;
  user: User;

  constructor(
    private wishlistService: WishlistService,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {

    this.authorizationService.getUser()
    .subscribe((resp: User) => this.user = resp);

    this.wishlistService.getWishlistSubject()
      .subscribe((data: any) => {

        return this.products = data;
      });
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

  searchIndex(prod: Product): any {

    for (let i: number = 0; i < this.products.length; i++) {
      if (this.products[i].id === prod.id) {

        return i;
      }
    }

    return false;
}

  onDelete(prod: Product): void {
    this.products.splice( this.searchIndex(prod), 1 );
      this.setUpdateWishlist();
  }
}
