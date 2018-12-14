import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Product, WishlistResponse } from '../models/';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistUrl: string = `${environment.api_url}/wishlists`;
  private wishlistSubject: any;
  private loaded: boolean =  false;

  constructor(
    private http: HttpClient,
    private notify: NotificationService,
  ) {
    this.wishlistSubject = new BehaviorSubject (null);
  }

  setWishlistSubject(wishlist: any): void {
    this.wishlistSubject.next(wishlist.items);
  }

  getWishlistSubject(): Observable<any> {
    return this.wishlistSubject.asObservable();
  }

  getWishlist(): Observable<any> {

    return this.http.get<any>(this.wishlistUrl);
  }

// <<<<<<< HEAD
//   getWishlistById(id: string): Observable<Product[]> {

//     return this.http.get<Product[]>(this.wishlistUrl + '/' + id).pipe(
//       map((res: any) => {

//         return res.wishlist.items;
// =======
  getWishlistById(id: string): Observable<any> {
    if (this.loaded) {
      return this.getWishlist();
    }

    return this.http.get<any>(this.wishlistUrl + '/' + id).pipe(
      switchMap((response: { success: boolean, wishlist: any }) => {
        this.setWishlistSubject(response.wishlist);
        this.loaded = true;

        return this.getWishlistSubject();
      })
    );
  }

  creatWishlist(newWishlist: any): Observable<any> {

    return this.http.post<any>(this.wishlistUrl, newWishlist).pipe(
      tap((res: any) => this.notify.show('Wishlist created.'))
    );
  }

  updateWishlist(id: string, update: any): Observable<any> {

    return this.http.put<any>(this.wishlistUrl + '/' + id, update).pipe(
      tap((res: any) => this.notify.show('Wishlist updated.'))
    );
  }

}
