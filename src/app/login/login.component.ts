import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private loginUserData: any = {};

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
      this.authService.route = 'login'; // Check var
      this.authService.sendUserData(this.loginUserData) // Check meth
      .subscribe(
        (result: any) => {
          this.router.navigate(['home']);
        }
        );
    }
  }

}
