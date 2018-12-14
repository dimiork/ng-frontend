import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { ProductsService } from '../../services/products.service';
// import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/models/user';
import { Wishlist } from 'src/app/models/wishlist.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public products$: Observable<Product[]>;
  public categories$: Observable<string[]>;

  minPrice: FormControl;
  maxPrice: FormControl;
  stock: FormControl;
  category: FormControl;
  filtersForm: FormGroup;

  id: string;

  idProduct: string;
  user: User;
  productsList: Product[];
  updateWishlist: Wishlist;

  index: number = null;

  constructor(
    private productsService: ProductsService,
    private wishlistService: WishlistService,
    private authorizationService: AuthorizationService,
    // private orderService: OrderService,
  ) {
    this.products$ = this.productsService.getAllProducts();
    this.categories$ = this.productsService.getCategories();

    this.filtersForm = new FormGroup({
      minPrice: new FormControl(''),
      maxPrice: new FormControl(''),
      stock: new FormControl(''),
      category: new FormControl('')
    });
  }

  ngOnInit(): void {

    this.authorizationService.getUser()
    .subscribe( (resp: User) => this.user = resp);

    this.wishlistService.getWishlistSubject()
      .subscribe((data: any) => this.productsList = data);

  }

  public getFilteredProducts(): void {

    const filter: { [key: string]: number | string } = Object.entries(this.filtersForm.value)
        .filter((item: [ string, number | string ]) => item[1])
        .reduce((acc: any, current: any) => {
          switch (current[0]) {
            case 'minPrice':
              acc['price'] ?
                acc['price'] = current[1] + acc['price'] :
                acc['price'] = current[1];
              break;

            case 'maxPrice':
              acc['price'] ?
                acc['price'] += 'to' + current[1] :
                acc['price'] = 'to' + current[1];
              break;

            default:
              acc[current[0]] = current[1];
          }

          return acc;
        }, Object.create(null));

    this.products$ = this.productsService.getAllProducts(filter);
  }

  public onResetFilters(): void {
    this.filtersForm.reset();
    this.products$ = this.productsService.getAllProducts();
  }

  public onAddToCart(product: Product, evt: Event): void {
    if (evt && product) {
      evt.stopPropagation();
      // this.orderService.createOrder(product);
    }
  }

  isFavorite (product: Product): boolean {
    if (!this.productsList) {
      return false;
    }

    return (this.searchIndex(product) === 0 || this.searchIndex(product) > 0);
  }

  setUpdateWishlist(): void {

    this.updateWishlist = {
      client: this.user,
      id: this.user.id,
      items: this.productsList
    };

    this.wishlistService.updateWishlist(this.user.id, this.updateWishlist)
      .subscribe( () => console.log('wishlist update'));

  }

  searchIndex(product: Product): any {

    for (let i: number = 0; i < this.productsList.length; i++) {
      if (this.productsList[i].id === product.id) {

        return i;
      }
    }

    return false;

  }

  addOrRemoveProduct(product: Product): any  {

    if (!this.productsList) {
      return false;
    }

    if (!this.isFavorite(product)) {
      this.productsList.push(product);
      this.setUpdateWishlist();
    } else {
      this.productsList.splice( this.searchIndex(product), 1 );
      this.setUpdateWishlist();
    }
  }

}
