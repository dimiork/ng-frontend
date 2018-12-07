import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Wishlist } from '../models/wishlist.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  api_url: string;

  private wishlistUrl: string = `${this.api_url}/wishlists`;

  constructor(private http: HttpClient) { }

  getWishlist(): Observable<Wishlist> {
    return this.http.get<Wishlist>(this.wishlistUrl);
  }

  creatWishlist(newWishlist: Wishlist): Observable<any> {
    return this.http.post<any>(this.wishlistUrl, newWishlist);
  }

  updateWishlist(id: string, update: Wishlist): Observable<Wishlist> {
    return this.http.put<Wishlist>(this.wishlistUrl + '/' + id, update);
  }

}
