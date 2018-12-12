import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  checkoutForm: FormGroup;
  submitted: boolean = false;

  categories: string[];

  get formControls(): {[key: string]: AbstractControl} {
    return this.checkoutForm.controls;
  }

  constructor(private formBuilder: FormBuilder) {/**/}

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      card_number: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      security_code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      expiration: ['', Validators.required],
    });
  }

  formOnSubmit(): void {
    const newCheckout: any = this.checkoutForm.value;

    this.submitted = true;
    if (this.checkoutForm.invalid) {
      return;
    }
    // do something with newCheckout
  }
}
