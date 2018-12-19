import { getTestBed, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductsService } from './products.service';
import { Product } from '../models';
import { environment } from '../../environments/environment';
import { Category } from '../models/categories';

const MOCK_PRODUCT_ID: string = '5c0e48fedbcfab000413ef17';

const MOCK_PRODUCT: Product = {
  id: MOCK_PRODUCT_ID,
  title: 'Product $100 II',
  description: 'Awesome 100-bucks good',
  category_id: '5c08fef1f4086d0004e5b23b',
  category_title: 'category_title',
  price: 100,
  stock: 7,
  thumbnail: 'http://via.placeholder.com/250x250'
};

const MOCK_PRODUCTS: Product[] = [MOCK_PRODUCT];

const MOCK_CATEGORY: Category = {
  id: 'test_id',
  title: 'test_title',
  description: 'test_description'
};

const MOCK_CATEGORIES: Category[] = [MOCK_CATEGORY, MOCK_CATEGORY];

describe('ProductsService', () => {
  let injector: TestBed;
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      providers: [ProductsService]
    });
    injector = getTestBed();
    service = injector.get(ProductsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<"Products"[]>', () => {
    service.getAllProducts().subscribe((products: Product[]) => {
      expect(products).toEqual(MOCK_PRODUCTS);
    });

    const req: TestRequest = httpMock.expectOne(environment.api_url + '/products');
    expect(req.request.method).toBe('GET');
    req.flush({products: MOCK_PRODUCTS});
  });

  it('should return an Observable<"Product">', () => {
    service.getProductById(MOCK_PRODUCT_ID).subscribe((product: Product) => {
      expect(product).toEqual(MOCK_PRODUCT);
    });

    const req: TestRequest = httpMock.expectOne(environment.api_url + '/products/' + MOCK_PRODUCT_ID);
    expect(req.request.method).toBe('GET');
    req.flush({product: MOCK_PRODUCT});
  });

  it('should return an Observable<"any"> when create product', () => {
    service.createProduct(MOCK_PRODUCT).subscribe((answ: any) => {
      expect(answ).toBeTruthy();
      expect(answ.product.tile === MOCK_PRODUCT.title);
    });

    const req: TestRequest = httpMock.expectOne(environment.api_url + '/products');
    expect(req.request.method).toBe('POST');
    req.flush({product: MOCK_PRODUCT});
  });

  it('should return an Observable<"any"> when get categories', () => {
    service.getCategories().subscribe((categories: any) => {
      expect(categories).toBeTruthy();
      expect(categories[0]).toBe(MOCK_CATEGORIES[0].title);
    });

    const req: TestRequest = httpMock.expectOne(environment.api_url + '/categories');
    expect(req.request.method).toBe('GET');
    req.flush({categories: MOCK_CATEGORIES});
  });

  it('should return an Observable<"any"> when create category', () => {
    service.createCategory(MOCK_CATEGORY).subscribe((answ: any) => {
      expect(answ).toBeTruthy();
      expect(answ.category.title).toBe(MOCK_CATEGORY.title);
    });

    const req: TestRequest = httpMock.expectOne(environment.api_url + '/categories');
    expect(req.request.method).toBe('POST');
    req.flush({category: req.request.body});
  });

});
