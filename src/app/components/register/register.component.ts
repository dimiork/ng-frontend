import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthorizationService,
    private router: Router
    ) { }

  loginUser(): void {

    this.authService.register(this.registerForm.value)
    .subscribe(
      (res: any) => {
        // this.router.navigate(['home']);
      },
      (err: any) => {
        alert('User not found');
      });
  }

}
