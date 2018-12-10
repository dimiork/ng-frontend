import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizationService } from '../../services/authorization.service';
import { Credentials } from '../../models/credentials'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private userCredentials: Credentials = {
    login: '',
    password: ''
  };

  constructor(
    private authService: AuthorizationService,
    private router: Router
    ) {

    if (localStorage.getItem('token')) {
      this.router.navigate(['home']);
    }
  }

  loginUser(): void {
    if ( this.userCredentials.login && this.userCredentials.password ) {
      this.authService.login(this.userCredentials)
      .subscribe(
        res => {
          this.router.navigate(['home']);
        });
    } else {
      alert('Please enter login and password!');
    }
  }

}
