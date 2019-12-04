import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { OrdercartService } from '../services/ordercart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, DoCheck {
    private userSub: Subscription;
    isAuthenticated = false;
    isManager = false;
    x = document.getElementById('myTopnav');
    collapsed = true;
    cartItemCount: number = 5;

    constructor(private authService: AuthService, readonly orderCart: OrdercartService) { }
    ngDoCheck() {
        this.cartItemCount = this.orderCart.itemsInCartCount;
    }

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user; //True when we have a user
            if (this.authService.isManager == true) {
                this.isManager = true;
            }
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    collapseFunc() {
        this.collapsed = !this.collapsed;
    }

    onLogout() {
        this.authService.logout();
    }
}

