import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from 'src/app/models/product.model';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {

  isFavorite: boolean = true;

  products: Product[];

  id: string;

  constructor( private wishlistService: WishlistService,
    private authorizationService: AuthorizationService ) {}

  ngOnInit(): void {
    this.authorizationService.getUser()
    .subscribe(user => {
      this.id = user.id;
      console.log(this.id);
      
      this.wishlistService.getWishlistById(this.id)
        .subscribe((data: any) => {
          this.products = data.items;
          console.log(data);
      }, err => console.log(err));
    });
  }

}
