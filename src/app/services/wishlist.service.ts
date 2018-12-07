import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistUrl = "https://incode-store.herokuapp.com/wishlists";

  constructor(private http: HttpClient) { }

  getWishlist(): Observable<any> {
    return this.http.get<any>(this.wishlistUrl);
  }

  creatWishlist(newWishlist): Observable<any> {
    return this.http.post<any>(this.wishlistUrl, newWishlist);
  }

  updateWishlist(id: number, update): Observable<any> {
    return this.http.put<any>(this.wishlistUrl + '/' + id, update);
  }
  
}