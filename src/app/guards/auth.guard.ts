import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

<<<<<<< HEAD
  private hasAcces: boolean;

  constructor(
    private router: Router,
    private authService: AuthorizationService
    ) {

    this.authService.isAuthorized()
    .subscribe((isPermitted: any) => {
      if (!!isPermitted) {
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
=======
	private hasAcces: boolean;

	constructor(
		private router: Router,
		private authService: AuthService
		) {

		this.authService.getCurrentUser() // Check whether this function name matches the one in the authService
		  .subscribe(client => {
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

>>>>>>> first commit v1.0

    return this.hasAcces;
  }
}
