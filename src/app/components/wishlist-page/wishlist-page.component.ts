import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {

  isFavorite: boolean = true;

  products: Product[];

  constructor( private wishlistService: WishlistService ) {}

  ngOnInit(): void {
    this.wishlistService.getWishlist()
    .subscribe((data: any) => {
      this.products = data.wishlists[0].items;
      console.log(this.products);
    });
  }
}
