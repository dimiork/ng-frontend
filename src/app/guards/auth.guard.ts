import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Location} from '@angular/common';

import { Observable } from 'rxjs';

import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private hasAcces: boolean;
  private startPath: string;

  constructor(
    private router: Router,
    private authService: AuthorizationService,
    private location: Location,
    ) {

    this.startPath = this.location.path();

    this.authService.isAuthorized()
    .subscribe((isPermitted: any) => {
      if (!!isPermitted) {
        this.router.navigate([this.startPath]);

        this.hasAcces = true;

        return;
      }

      this.router.navigate(['login']);

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
