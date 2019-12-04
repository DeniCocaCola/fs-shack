import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-home-carousel',
    templateUrl: './home-carousel.component.html',
    styleUrls: ['./home-carousel.component.scss'],
    providers: [NgbCarouselConfig],
    encapsulation: ViewEncapsulation.None
    /* template: `
     <ng-image-slider infinite=true showArrow=false [images]="imageObject" #nav>
     </ng-image-slider>`,*/


})

export class HomeCarouselComponent implements OnInit {


    //images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

    images = [
        `../../assets/images/carousel/apple_stuffed_pancake.png`, // 0
        `../../assets/images/carousel/pbj_french_toast.jpg`,
        `../../assets/images/carousel/chicken_skewers.jpg`,
        `../../assets/images/carousel/chili_burger.jpg`, // 3
        `../../assets/images/carousel/lime_margarita.jpg`,
        `../../assets/images/carousel/pancakes_chicken.jpg`,
        `../../assets/images/carousel/pinto_tacos.jpg`, // 6
        `../../assets/images/carousel/shishkabobs.jpg`
    ];

    constructor(config: NgbCarouselConfig) {
        config.interval = 10000;
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = false;
    }

    ngOnInit() {
    }

}
