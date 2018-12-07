import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private hasAcces: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
    ) {

<<<<<<< HEAD
    this.authService.getUser()
    .subscribe(user => {
      if (!!user) {
=======
    this.authService.getCurrentUser() // Check whether this function name matches the one in the authService
    .subscribe((client: any) => {
      if (!!client) {
>>>>>>> release v1.0
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
<<<<<<< HEAD

=======
>>>>>>> release v1.0

    return this.hasAcces;
  }
}
