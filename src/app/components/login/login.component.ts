import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Credentials } from '../models/credentials'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private loginUserData: Credentials;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {

    if (localStorage.getItem('token')) {
      this.router.navigate(['home']);
    }
  }

  loginUser(): void {
    if (Object.values(this.loginUserData).length) {
      this.authService.route = 'login';
      this.authService.login(this.loginUserData)
      .subscribe(
        (result: any) => {
          this.router.navigate(['home']);
        }
        );
    }
  }

}
