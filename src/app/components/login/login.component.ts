import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  public loginForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthorizationService,
    private router: Router
    ) { }

  loginUser(): void {

    this.userCredentials.login = this.loginForm.value.login;
    this.userCredentials.password = this.loginForm.value.password;

    this.authService.login(this.userCredentials)
    .subscribe(
      (res: any) => {
        // this.router.navigate(['home']);
      },
      (err: any) => {
        alert('User not found');
      });
  }

}
