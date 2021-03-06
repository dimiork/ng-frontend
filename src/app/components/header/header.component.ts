import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../models/';
import { AuthorizationService } from '../../services/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isAuthorized$: Observable<boolean>;
  public user$: Observable<User | null>;
  @Input() products: Product[];

  constructor (private authService: AuthorizationService) {

    this.isAuthorized$ = this.authService.isAuthorized();
    this.user$ = this.authService.getUser();
  }

  isAuthorized(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    this.authService.logout();
  }
}
