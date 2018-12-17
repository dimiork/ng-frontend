import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthorizationService } from '../../services/authorization.service';
import { User } from '../../models/';

import { Observable } from 'rxjs';

import { User } from '../../models/user';
import { AuthorizationService } from '../../services/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isAuthorized$: Observable<boolean>;
  public user$: Observable<User | null>;

  constructor (private authService: AuthorizationService) {

    this.isAuthorized$ = this.authService.isAuthorized();
    this.user$ = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout();
  }

  logout(): void {
    this.authService.logout();
  }
}
