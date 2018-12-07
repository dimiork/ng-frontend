import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.api_url + '/products', {}).pipe(
      map((data: any) => data['products'])
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product[]>(environment.api_url + '/products/' + id, {}).pipe(
      map((data: any) => data['product'])
    );
  }

  createProduct(newProduct: Product): Observable<any> {
    return this.httpClient.post(environment.api_url + '/products', newProduct);
  }
}
