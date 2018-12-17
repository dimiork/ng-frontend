import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthorizationService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class DisableLoginGuard implements CanActivate {

  private userIsLogin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthorizationService
  ) {

    this.authService.isAuthorized()
    .subscribe((isPermitted: any) => {
      if (!!isPermitted) {
        this.userIsLogin = false;
        this.router.navigate(['']);

        return;
      }
      this.userIsLogin = true;
      this.router.navigate(['login']);

    });
  }

  canActivate(): Observable<boolean> | boolean {

    return this.userIsLogin;
  }
}
