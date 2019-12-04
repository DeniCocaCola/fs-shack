import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { OrdercartService } from '../services/ordercart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss']
})
export class ConstructionComponent implements OnInit {
  menuType: string;
  menuTitle: string;
  lunchArray = [];
  displayArray = [];
  items = [];
  isLoading = false;

  constructor(
    private menuService: MenuService,
    private http: HttpClient,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private orderCart: OrdercartService
  ) {
    this.route.params.subscribe(
      params => this.setTypeFromRoute(params['menutype'])); (1)
  }

  setTypeFromRoute(params) { // The params is equal to the passed menutype in the route
    this.menuType = params;
  }
  //items = this.lunchArray;


  ngOnInit() {
    this.setMenuTitle(this.menuType)
    this.fetchLunch();
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

  fetchLunch() {
    this.isLoading = true;
    this.http.get('https://fullstack-shack.firebaseio.com/menu/' + this.menuType + '.json')
      .pipe(map(responseData => {
        const menuArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            menuArray.push({ ...responseData[key], id: key })
          }
        }
        return menuArray;
      })).subscribe(lunchItems => {
        this.displayArray = lunchItems;
        this.items = this.displayArray;
        this.isLoading = false;
      });
  }

  addItemToCart(item: string, price) {
    this.snackBar.open("Added '" + item + "' to your cart", "Close", { duration: 2000 });
    this.orderCart.addItemToCart(item, price);
  }
}
