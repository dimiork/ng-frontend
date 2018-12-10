import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Wishlist } from '../models/wishlist.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistUrl: string = `${environment.api_url}/wishlists`;

  constructor(private http: HttpClient) { }

  getWishlist(): Observable<Wishlist> {
    return this.http.get<Wishlist>(this.wishlistUrl);
  }
  
  creatWishlist(newWishlist: any): Observable<any> {
    return this.http.post<any>(this.wishlistUrl, newWishlist);
  }

  updateWishlist(id: string, update: any): Observable<any> {
    return this.http.put<any>(this.wishlistUrl + '/' + id, update);
  }

}
