import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StatisticProduct, StatisticOrder } from '../models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient: HttpClient) { }

  getStatisticsOfProducts(): Observable<StatisticProduct[]> {
    return this.httpClient.get<StatisticProduct[]>(environment.api_url + '/products/statistics', {}).pipe(
      map((data: StatisticProduct[]) => data['statistics']),
      map( (resp: any) => resp.map( (x: any) => ({ 'name': x._id || 'name', 'value': x.count || 0 })) )
    );
  }

  getStatisticsOfOrders(): Observable<StatisticOrder[]> {
    return this.httpClient.get<StatisticOrder[]>(environment.api_url + '/orders/statistics', {}).pipe(
      map( (data: StatisticOrder[]) => data['statistics'] ),
      map( (resp: any) => resp.map((x: any) => ( { 'name': x._id.date || 0, 'value': x.total } ) ) )
    );
  }

}
