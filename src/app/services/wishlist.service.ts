import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  api_url: string;

  private wishlistUrl: string = `${this.api_url}/wishlists`;

  constructor(private http: HttpClient) { }

  getWishlist(): Observable<any> {
    return this.http.get<any>(this.wishlistUrl);
  }

  creatWishlist(newWishlist: any): Observable<any> {
    return this.http.post<any>(this.wishlistUrl, newWishlist);
  }

  updateWishlist(id: string, update: any): Observable<any> {
    return this.http.put<any>(this.wishlistUrl + '/' + id, update);
  }
}
