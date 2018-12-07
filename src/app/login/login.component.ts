import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AuthService } from '../services/auth.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	private loginUserData = {};

	constructor(
		private authService: AuthService,
		private router: Router
		) {

		if (localStorage.getItem('token')) {
			this.router.navigate(['home']);
		}
	}

	loginUser() {
		if (Object.values(this.loginUserData).length) {
			this.authService.route = 'login'; // Check var
			this.authService.sendUserData(this.loginUserData) // Check meth
			.subscribe(
					result => {
						this.router.navigate(['home']);
					}
				);
		}
	}

}
