import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent {
    loginStatus = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService,private router: Router){}
    
    changeLoginStatus() {
        this.loginStatus = !this.loginStatus;
    }

    onSubmit(form: NgForm){
        const email = form.value.email;
        const password = form.value.password;
        let authObserve: Observable<AuthResponseData>;

        if (!form.valid) {
            return;
        }
        this.isLoading = true;

        if (this.loginStatus) {
            authObserve = this.authService.login(email, password);
        }else {
            authObserve = this.authService.signup(email, password);
        }


        authObserve.subscribe(responseData => {
            console.log(responseData);
            this.isLoading = false;
            this.router.navigate(['/home']); //navigate once user is logged in
        },
        err => {
            console.log(err);
            this.error = err;
            this.isLoading = false;
        }
            
        )
        form.reset();
    }
}