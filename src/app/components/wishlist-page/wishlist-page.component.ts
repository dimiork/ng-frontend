import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

import { WishlistService } from '../../services/wishlist.service';
import { Product } from 'src/app/models/product.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(
    private wishlistService: WishlistService,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.authorizationService.getUser().subscribe((user: any) => {
      if (user && user.id) {
        this.products$ = this.wishlistService.getWishlistById(user.id);
      }
    });
  }
}
