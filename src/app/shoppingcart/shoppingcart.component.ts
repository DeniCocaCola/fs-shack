import { Component, OnInit } from '@angular/core';
import { OrdercartService } from '../services/ordercart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  constructor(readonly orderCart: OrdercartService) { }
  items = this.orderCart.cartArray;
  count = this.orderCart.itemsInCartCount;
  price: number;

  displayedColumns = ["item", "price"];
  ngOnInit() {
    if (this.count > 0) {
      this.price = this.orderCart.cartTotal();
    }
  }

}
