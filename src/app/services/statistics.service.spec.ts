import { getTestBed, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../../environments/environment';
import { StatisticsService } from './statistics.service';

const MOCK_PROD_STATISTIC: any = {
  _id: 'whisky',
  count: 4
};
const MOCK_PROD_STATISTIC_AFTER_MAP: any = {
  name: 'whisky',
  value: 4
};
const MOCK_PROD_STATISTICS: any[] = [MOCK_PROD_STATISTIC];
const MOCK_PROD_STATISTICS_AFTER_MAP: any[] = [MOCK_PROD_STATISTIC_AFTER_MAP];

const MOCK_ORDER_STATISTIC: any =         {
  _id: {
    date: 1
  },
  total: 10
};
const MOCK_ORDER_STATISTIC_AFTER_MAP: any = {
  name: 1,
  value: 10
};
const MOCK_ORDER_STATISTICS: any[] = [MOCK_ORDER_STATISTIC];
const MOCK_ORDER_STATISTICS_AFTER_MAP: any[] = [MOCK_ORDER_STATISTIC_AFTER_MAP];

describe('StatisticsService', () => {
  let injector: TestBed;
  let service: StatisticsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      providers: [StatisticsService]
    });
    injector = getTestBed();
    service = injector.get(StatisticsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<"any"> when call getStatisticsOfProducts', () => {
    service.getStatisticsOfProducts().subscribe((productStatistics: any) => {
      expect(productStatistics).toEqual(MOCK_PROD_STATISTICS_AFTER_MAP);
    });

    const req: TestRequest = httpMock.expectOne(environment.api_url + '/products/statistics');
    expect(req.request.method).toBe('GET');
    req.flush({statistics: MOCK_PROD_STATISTICS});
  });

  it('should return an Observable<"any"> when call getStatisticsOfOrders', () => {
    service.getStatisticsOfOrders().subscribe((orderStatistics: any) => {
      expect(orderStatistics).toEqual(MOCK_ORDER_STATISTICS_AFTER_MAP);
    });

    const req: TestRequest = httpMock.expectOne(environment.api_url + '/orders/statistics');
    expect(req.request.method).toBe('GET');
    req.flush({statistics: MOCK_ORDER_STATISTICS});
  });

});
