import { Component, OnInit } from '@angular/core';
import { OrdercartService } from '../../services/ordercart.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.scss']
})
export class CreateorderComponent implements OnInit {
  createForm: FormGroup;
  orderList: { item: string }[] = [];
  localTime: string;

  constructor(private orderService: OrdercartService, private router: Router, private fb: FormBuilder, private authService: AuthService, public snackBar: MatSnackBar,) {
    this.createForm = this.fb.group({
      email: ['', Validators.required],
      userPhone: ['', Validators.required],
      address: ['', Validators.required],
      addrCity: ['', Validators.required],
      postalCode: ['', Validators.required],
      instructions: ''
    });
  }

  ngOnInit() {
  }

  addOrder(email, userPhone, address, addrCity, postalCode, instructions) {
    this.orderService.createOrder(email, userPhone, address, addrCity, postalCode,  this.orderService.cartArray, instructions, this.checkTime() ).subscribe(() => {
      console.log('Order created.');
      this.snackBar.open("Your order has been placed. Thank you.", "Close", { duration: 5000 });
      this.router.navigate(['/home']);
    });
  }
  checkTime(): string {
    let localTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    this.localTime = localTime;
    return localTime;
  }
}
