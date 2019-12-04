import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class OrdercartService implements OnInit {
  //cartArray: { item: string }[] = [];
  cartArray = [];

  itemsInCartCount: number;
  cartPrice: { price: number }[] = [];
  cartTotalPrice: number = 0;
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
  }

  addItemToCart(item: string, price: number) {
    this.cartArray.push(item);
    this.cartPrice.push({ price });
    this.itemsInCartCount = this.cartArray.length;
    if (this.cartArray.length != this.cartPrice.length) {
      console.log("An error has occurred in the cart. Lengths not corresponding!");
    }
  }

  isCartEmpty() {
    return (this.itemsInCartCount > 0) ? true : false;
  }

  cartTotal(): number {
    let totalCost: number = 0;
    for (let i = 0; i < this.cartArray.length; i++) {
      totalCost += Number(this.cartPrice[i].price);
    }
    return totalCost;
  }

  createOrder(email: string, userPhone: number, address: string, addrCity: string, postalCode: number, orderList, instructions: string, orderDate: string) {
    const order = {
      email: email,
      userPhone: userPhone,
      address: address,
      addrCity: addrCity,
      postalCode: postalCode,
      orderList: orderList,
      instructions: instructions,
      orderDate: orderDate
    };
    //console.log(order);
    //return this.http.post(`${this.uri}/orders/create`, order);
    return this.http.post(`https://fullstack-shack.firebaseio.com/orders.json`, order);
  }
}