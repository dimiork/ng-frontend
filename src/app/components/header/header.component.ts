import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthorizationService } from '../../services/authorization.service';
import { User } from '../../models/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user$: Observable<User>;

  constructor (
    private router: Router,
    private authService: AuthorizationService,
  ) {
    this.user$ = this.authService.getUser();
  }

  isAuthorized(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    this.authService.logout();
  }
}
