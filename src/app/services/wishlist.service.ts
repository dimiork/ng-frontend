import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistUrl: string = `${environment.api_url}/wishlists`;

  constructor(private http: HttpClient) { }

  getWishlist(): Observable<any> {
    return this.http.get<any>(this.wishlistUrl);
  }

  getWishlistById(id: string): Observable<any> {
    return this.http.get<any>(this.wishlistUrl + '/' + id);
  }

  creatWishlist(newWishlist: any): Observable<any> {
    return this.http.post<any>(this.wishlistUrl, newWishlist);
  }

  updateWishlist(id: string, update: any): Observable<any> {
    return this.http.put<any>(this.wishlistUrl + '/' + id, update);
  }

}
