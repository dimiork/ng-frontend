import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Category } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) {/**/}

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(environment.api_url + '/categories', {}).pipe(
      map((data: any) => data['categories'])
    );
  }
}
