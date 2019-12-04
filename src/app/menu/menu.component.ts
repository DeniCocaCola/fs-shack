import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { IssueService } from '../issue.service';
import { Issue } from '../issue.model';

import { OrdercartService } from '../services/ordercart.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuType: string;
  menuTitle: string;

  issues: Issue[];

  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService,
    private router: Router,
    private orderCart: OrdercartService,
    public snackBar: MatSnackBar
  ) {
    this.route.params.subscribe(
      params => this.setTypeFromRoute(params['menutype'])); (1)
  }

  ngOnInit() {
    this.setMenuTitle(this.menuType)
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService.getIssues().subscribe((data: Issue[]) => {
      this.issues = data;
      //console.log('Data requested ...');
      //console.log(this.issues);
    });
  }
  setTypeFromRoute(params) { // The params is equal to the passed menutype in the route
    this.menuType = params;
  }

  setMenuTitle(menuType) {
    switch (menuType) {
      case 'Dessert':
        this.menuTitle = "Desserts";
        break;
      case 'Appetizer':
        this.menuTitle = "Appetizers";
        break;
      case 'Drink':
        this.menuTitle = "Drinks";
        break;
      default:
        this.menuTitle = menuType;
        break
    }
  }
  addItemToCart(item: string, price) {
    this.snackBar.open("Added '" + item + "' to your cart", "Close", {duration: 2000});
    this.orderCart.addItemToCart(item, price);
  }
}
