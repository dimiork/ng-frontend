import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { tap, take, switchMap, filter } from 'rxjs/operators';

import { AuthorizationService, NotificationService } from './services/';
import { WishlistService } from './services/wishlist.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'ng-frontend';
  isReady: boolean;
  // isReady: Observable<boolean>;

  user: User;
  wishlist: any = {};
  products: any = {};

  constructor(
    private authService: AuthorizationService,
    private wishlistService: WishlistService,
    private notify: NotificationService
  ) {

// <<<<<<< HEAD
//     this.isReady = this.authService.isReady();
// =======
    this.authService.isReady().pipe(
      tap((state: boolean) => {
        this.isReady = state;
      }),
      filter((state: boolean) => !!state),
      take(1)
    ).subscribe((data: boolean) => {
      if (!data) {
        return;
      }
      this.getWishlist();
    });

 }

  getWishlist(): void {
    this.authService.getUser()
    .pipe(
      filter((response: any) => !!response ),
      switchMap((response: User) => {
        this.user = response;

        return this.wishlistService.getWishlistById(response.id);
      }),
      take(1)
    )
    .subscribe( (data: any) => this.products = data,
    (err: any) => {
      if (err === 'Not Found') {
        console.log('err');
        this.wishlist = {
          client: this.user,
          id: this.user.id,
          items: []
        };
      this.wishlistService.creatWishlist(this.wishlist)
        .subscribe( () => console.log('wishlist creat'));
      this.wishlistService.setWishlistSubject(this.wishlist);
    }
    this.notify.show(err);
    });

  }

 }
