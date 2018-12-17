import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthorizationService, NotificationService } from '../../services/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private notify: NotificationService
    ) { }

  loginUser(): void {

    this.authService.login(this.loginForm.value)
    .subscribe(
      (res: any) => {
        this.router.navigate(['']);
      },
      (err: any) => {
        this.notify.show(err);
      });
  }

}
