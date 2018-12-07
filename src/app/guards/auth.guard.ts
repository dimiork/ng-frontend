import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private hasAcces: boolean;

  constructor(
    private router: Router,
    private authService: AuthorizationService
    ) {

    this.authService.getUser()
    .subscribe((client: any) => {
      if (!!client) {
        this.router.navigate(['home']);
        this.hasAcces = true;

        return;
      }

      this.hasAcces = false;

    });
  }

  canActivate(): Observable<boolean> | boolean {

    if (!this.hasAcces) {
      this.router.navigate(['login']);
    }

    return this.hasAcces;
  }
}
