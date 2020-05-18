import { APIService, IResponse } from './API.service';
import { APIRepository } from './API-repository';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { IUser, cookieJwtName, IUserOption } from 'src/app/models/IUser';
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

export interface IPromoteAgentRequest {
    userId: string;
}

export interface IPromoteAdminRequest {
    userId: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService extends APIRepository<IUser> {

    private _user: IUser;
    private isLoadedPromise: Promise<IUser>;
    private _userOptions: IUserOption[] = [];

    public onUserChange: EventEmitter<IUser> = new EventEmitter();

    public get getIsLoadedPromise(): Promise<IUser> {
        return this.isLoadedPromise;
    }

    public get user(): IUser {
        return this._user;
    }

    public get userOptions(): IUserOption[] {
        return this._userOptions;
    }

    public setUser(value) {
        this._user = value;
        this.onUserChange.next(value);
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
                this._cookieService.set(
                    cookieJwtName,
                    JSON.stringify(user.token),
                    new Date(user.token.expiresDate).getDate());
                return user;
            }));
    }

    public promoteAgent(request: IPromoteAgentRequest): Observable<IUser>  {
        this._userOptions = [];
        return this._API.put(`${this.className}/PromoteAgent`, request);
    }

    public promoteAdmin(request: IPromoteAdminRequest): Observable<IUser>  {
        this._userOptions = [];
        return this._API.put(`${this.className}/PromoteAdmin`, request);
    }


    public getAllOptions(): Promise<IUserOption[]> {
        if (!this.userOptions || this.userOptions.length === 0)
        {
            return this._API.get<IUserOption[]>(`${this.className}/GetAllOptions`).pipe(
                map((userOptions: IUserOption[]) => {
                    this._userOptions = userOptions;
                    return userOptions;
                })).toPromise();
        }
        return new Promise((resolve) => resolve(this.userOptions));
    }

    public search(request: ISearchUserRequest): Observable<IResponse<IUser[]>> {
        return this._API.getQueryTotal<IUser[]>(`${this.className}/Search`, request);
    }

    public delete(id: string): Observable<any> {
        return this._API.delete<any>(`${this.className}/Delete?Id=${id}`);
    }
}
