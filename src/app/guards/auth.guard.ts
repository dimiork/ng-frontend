import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, throwError, of } from 'rxjs';
import { map, share, catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private hasAcces: Observable<boolean> | boolean;
  private startPath: string;

  constructor(
    private router: Router,
    private authService: AuthorizationService,
    ) {
    this.authService.isAuthorized().subscribe((auth: boolean) => {
      this.hasAcces = auth;
    });
  }

  canActivate(): Observable<boolean> | boolean {
    if (!!this.hasAcces) {

      return true;
    }

    return this.authService.fetchUser().pipe(
      map((user: User) => {
        if (user) {

          return true;
        }
        this.router.navigate(['login']);

        return false;
      }),
      catchError((err: any) => {
        this.router.navigate(['login']);

        return throwError(err);
      })
    );
  }
}
