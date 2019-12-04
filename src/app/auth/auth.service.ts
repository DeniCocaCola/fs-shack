import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UrlResolver } from '@angular/compiler';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    isManager: boolean = false; //MUST BE FALSE
    publicID: string;
    private tokenExpirationTimer : any;

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseConfig.apiKey,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            ).pipe(catchError(this.errorHandling), tap(resData => {
                this.authHandler(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
            );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseConfig.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.errorHandling), tap(resData => {
            this.authHandler(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
            );
        })
        );
    }

 autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            console.log("No user data found.");
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {

            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.isManager = false;
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        console.log("User has logged out.");
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }


    private authHandler(email: string, 
        userId: string, 
        token: string, 
        expiresIn: number
        ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
        this.publicID = user.email;


        if (userId === "vjrH8nhjbFPA8GYTdKcfQLV1kbx2" && email === "admin@fs.com") {
            console.log("Administrator account has authenticated.")
            this.isManager = true;
        } 
    }


    private errorHandling(errorRes: HttpErrorResponse) {
        let errorAlert = "Unknown error occurred";
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorAlert);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorAlert = 'This email address may already be in use.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorAlert = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorAlert = 'Incorrect email and/or password.';
                break;
            case 'INVALID_PASSWORD':
                errorAlert = 'Incorrect email and/or password.';
                break;
        }
        return throwError(errorAlert);
    }
}



