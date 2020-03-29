import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser, cookieJwtName } from 'src/app/models/IUser';
import { ISocialLogin } from 'src/app/models/ISocialLogin';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ICreateUserRequest {
    email: string;
    password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends APIRepository<IUser> {

    private user: IUser;

    public get getUser() {
        return this.user;
    }

    constructor(public _API: APIService, private _cookieService: CookieService) {
        super(_API, 'Users');
    }

    public logout() {
        this._cookieService.delete(cookieJwtName);
        this.user = null;
    }

    public authentificationJwt(): Observable<IUser> {
        return this._API.post(`${this.className}/AuthentificationJwt`, {}).pipe(
            map((user: IUser) => {
                this.user = user;
                return user;
            }));
    }

    public verifyLogin(login: ILoginRequest): Observable<IUser> {
        return this._API.post(`${this.className}/Authentification`, login).pipe(
            map((user: IUser) => {
                this.user = user;
                this._cookieService.set(
                    cookieJwtName,
                    JSON.stringify(user.token),
                    new Date(user.token.expiresDate).getDate());
                console.log(cookieJwtName, JSON.stringify(user.token));
                return user;
            }));
    }

    public create(request: ICreateUserRequest): Observable<IUser> {
        return this._API.post(`${this.className}/Add`, request).pipe(
            map((user: IUser) => {
                this.user = user;
                return user;
            }));
    }

    public verifySocialLogin(socialLogin: ISocialLogin): Observable<IUser> {
        return this._API.post(`${this.className}/VerifySocialLogin`, socialLogin);
    }
}
