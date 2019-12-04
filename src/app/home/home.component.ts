import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    x = document.getElementById('myTopnav');
    constructor() { }

    ngOnInit() {
    }


    myFunction() {

        if (this.x.className === 'topnav') {
            this.x.className += ' responsive';
        } else {
            this.x.className = 'topnav';
        }
    }
}
