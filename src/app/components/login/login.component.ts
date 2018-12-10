import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { AuthorizationService } from '../../services/authorization.service';
import { Credentials } from '../../models/credentials';

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

  private login = new FormControl('');
  private password = new FormControl('');

  constructor(
    private authService: AuthorizationService,
    private router: Router
    ) {

    // if (localStorage.getItem('token')) {
    //   this.router.navigate(['home']);
    // }
  }

  loginUser(): void {

    if ( this.login.value && this.password.value ) {

      this.userCredentials.login = this.login.value;
      this.userCredentials.password = this.password.value;

      this.authService.login(this.userCredentials)
      .subscribe(
        (res: any) => {
          // this.router.navigate(['home']);
        },
        (err: any) => {
          alert('User not found');
        });
    } else {
      alert('Please enter login and password!');
    }
  }

}
