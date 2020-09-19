import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponseData{
    idToken:	string;
    email:	string;
    refreshToken:	string;
    expiresIn:	string;
    localId: string;
    registered?: string;
}
@Injectable()
export class AuthService{
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;
    constructor(private http: HttpClient, private router: Router){}

    signup(email: string, password: string): Observable<AuthResponseData>{
        // tslint:disable-next-line:max-line-length
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIkey,
        {
            email,
            password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            }));
    }

    autoLogin(): void{
        const userData: {
            email: string,
            userId: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData){
            return;
        }
        const loadedUser = new User(userData.email, userData.userId, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }
    login(email: string, password: string): Observable<AuthResponseData>{
        // tslint:disable-next-line:max-line-length
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIkey,
        {
            email,
            password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            }));
    }

    logout(): void{
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number): void{
      this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
    private handleAuthentication(email: string, userId: string, token: string, expireIn: number): void{
        const expirationDate = new Date(new Date().getTime() + (+expireIn * 1000));
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(+expireIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    // tslint:disable-next-line:typedef
    private handleError(errorRes: HttpErrorResponse){
        let errorMesasge = 'An unknown error occured';
        console.log(errorRes);
        if (!errorRes.error || !errorRes.error.error){
            return throwError(errorMesasge);
        }
        switch (errorRes.error.error.message){
        case 'EMAIL_EXISTS':
            errorMesasge = 'An user already exists';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMesasge = 'Email not found';
            break;
        case 'INVALID_PASSWORD':
            errorMesasge = 'Wrong Password';
            break;
       }
        return throwError(errorMesasge);

    }
}
