import { APIService, IResponse } from './API.service';
import { APIRepository } from './API-repository';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser, cookieJwtName } from 'src/app/models/IUser';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { SortType } from 'src/app/models/shared/Sort';

export enum UserSortField {
    Firstname,
    Lastname,
    Email
}

export const userSortFieldMap = new Map<UserSortField, string>([
   [UserSortField.Firstname, 'firstname'], 
   [UserSortField.Lastname, 'lastname'], 
   [UserSortField.Email, 'email'], 
]);

export const userSortFieldMapReverse = new Map<string , UserSortField>([
    ['firstname', UserSortField.Firstname], 
    ['lastname', UserSortField.Lastname], 
    ['email', UserSortField.Email], 
 ]);

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ICreateUserRequest {
    email: string;
    password: string;
}

export interface ISearchUserRequest {
    fullText: string;
    pageSize: number;
    pageNumber: number;
    sortField: UserSortField;
    sortType: SortType;
}

@Injectable({
    providedIn: 'root'
})
export class UserService extends APIRepository<IUser> {

    private _user: IUser;
    private isLoadedPromise: Promise<IUser>;

    public get getIsLoadedPromise(): Promise<IUser> {
        return this.isLoadedPromise;
    }

    public get user(): IUser {
        return this._user;
    }

    public setUser(value) {
        this._user = value;

        if (!value) {
            this.isLoadedPromise = Promise.resolve(null);
        }
    }

    constructor (public _API: APIService, private _cookieService: CookieService) {
        super(_API, 'Users');
        this.isLoadedPromise = this.authentificationJwt().toPromise();
    }

    public logout() {
        this._cookieService.delete(cookieJwtName);
        this.setUser(null);
    }

    public authentificationJwt(): Observable<IUser> {
        return this._API.post(`${this.className}/AuthentificationJwt`, {}).pipe(
            map((user: IUser) => {
                this.setUser(user);
                return user;
            }));
    }

    public verifyLoginAdmin(login: ILoginRequest): Observable<IUser> {
        return this._API.post(`${this.className}/AuthentificationAdmin`, login).pipe(
            map((user: IUser) => {
                this.setUser(user);
                this._cookieService.set(
                    cookieJwtName,
                    JSON.stringify(user.token),
                    new Date(user.token.expiresDate).getDate());
                return user;
            }));
    }

    
    public verifyLogin(login: ILoginRequest): Observable<IUser> {
        return this._API.post(`${this.className}/Authentification`, login).pipe(
            map((user: IUser) => {
                this.setUser(user);
                this._cookieService.set(
                    cookieJwtName,
                    JSON.stringify(user.token),
                    new Date(user.token.expiresDate).getDate());
                return user;
            }));
    }

    public create(request: ICreateUserRequest): Observable<IUser> {
        return this._API.post(`${this.className}/Add`, request).pipe(
            map((user: IUser) => {
                this.setUser(user);
                return user;
            }));
    }

    public search(request: ISearchUserRequest): Observable<IResponse<IUser[]>> {
        return this._API.getQueryTotal<IUser[]>(`${this.className}/Search`, request);
    }
}
