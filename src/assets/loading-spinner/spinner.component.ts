import { Component } from "@angular/core";

@Component({
    selector: 'app-spinner',
    template: '<div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-dual-ring"><div></div><div><div></div></div></div>',
    styleUrls: ['./spinner.scss']
})

export class SpinnerComponent {

}