import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { Order } from '../models/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private order: BehaviorSubject<Order> = new BehaviorSubject(null);

  public getOrder(): Observable<Order> {
    return this.order.asObservable();
  }

  constructor(private httpClient: HttpClient) {/**/}

  createOrder(newOrder: Order): Observable<any> {
    return this.httpClient.post(environment.api_url + '/orders', newOrder);
  }
}
