import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from 'src/app/models/product.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {

  products: Product[];

  id: string;

  constructor( private wishlistService: WishlistService,
    private authorizationService: AuthorizationService ) {}

  ngOnInit(): void {
    this.authorizationService.getUser()
    .subscribe((user: User) => {
      this.id = user.id;
      this.wishlistService.getWishlistById(this.id)
        .subscribe((data: any) => {
          this.products = data.items;
          console.log(data);
      });
    });
  }

}
