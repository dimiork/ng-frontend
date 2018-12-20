import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CartService } from '../../services/cart.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Order } from '../../models/order';
import { User } from '../../models/user';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  checkoutForm: FormGroup;
  submitted: boolean = false;

  order: Order = null;
  user: User = null;

  objectKeys: any = Object.keys;

  get formControls(): {[key: string]: AbstractControl} {
    return this.checkoutForm.controls;
  }

  get submittedAndCardErr(): boolean {
    return !!(this.submitted && this.formControls.card_number.errors);
  }

  get submittedAndSecurityErr(): boolean {
    return !!(this.submitted && this.formControls.security_code.errors);
  }

  get submittedAndExpirationErr(): boolean {
    return !!(this.submitted && this.formControls.expiration.errors);
  }

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private authorizationService: AuthorizationService
    ) {

    this.authorizationService.getUser()
    .subscribe( (resp: User) => this.user = resp);
  }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      card_number: ['', [Validators.required, Validators.pattern(/^([0-9]){16}$/)]],
      security_code: ['', [Validators.required, Validators.pattern(/^([0-9]){3}$/)]],
      expiration: ['', Validators.required],
    });

    this.cartService.getOrder(this.user).subscribe(
      (order: Order) => {
        this.order = order;
      },
      (err: any) => {
        this.order = null;
      }
    );
  }

  formOnSubmit(): void {
    this.submitted = true;
    if (this.checkoutForm.invalid || !this.order) {
      return;
    }

    // this.cartService.createOrder(this.order).subscribe(
    //   (next: any) => {/**/},
    //   (err: any) => {/**/}
    // );
  }
}
