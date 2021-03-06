import { APIService, IResponse } from './API.service';
import { APIRepository } from './API-repository';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { IUser, cookieJwtName, IUserOption, IUserPersonal, IIAuthentificationToken, tokenToObject, IUserEmailExist } from 'src/app/models/IUser';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { SortType } from 'src/app/models/shared/Sort';
import { IUserCompany } from './../../models/IUser';
import { ActivatedRoute } from '@angular/router';

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

export interface IUserUpdateRequest {
    id: string;
    personal: IUserPersonal;
    company: IUserCompany;
}

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

export interface IUserChangeRoleRequest {
    userId: string;
    hasAgentAccess: boolean;
    hasAdminAccess: boolean;
}

export interface IUserResetPasswordRequest {
    email: string;
}

export interface IUserChangePasswordRequest {
    password: string;
}

export interface IUserGetByEmail {
    email: string;
}


@Injectable({
    providedIn: 'root'
})
export class UserService extends APIRepository<IUser> {

    private _user: IUser;
    private isLoadedPromise: Promise<IUser>;
    private isLoadedOnce = false;
    private _userOptions: IUserOption[] = [];

    public onUserChange: EventEmitter<IUser> = new EventEmitter();

    public get getIsLoadedPromise(): Promise<IUser> {
        if (this.isLoadedOnce) {
            return this.isLoadedPromise;
        }
        return this.authentificationJwt()?.toPromise();
    }

    public get isLogged(): boolean {
        return this._user ? true : false;
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

    constructor (
        public _API: APIService, 
        private _cookieService: CookieService, 
        private route: ActivatedRoute
        ) {
        super(_API, 'Users');

        this.loginWithToken();
    }

    private loginWithToken() {
        if (!this.user) {
            this.route.queryParams.subscribe(params => {
                const token: IIAuthentificationToken = {
                    jwt: params['jwt'],
                    expiresDate: params['expiresDate'],
                };
                if (token.jwt) {
                    this._cookieService.set(
                        cookieJwtName,
                        JSON.stringify(token),
                        new Date(params['expiresDate']).getDate()
                    );
                    if (!this.isLoadedOnce) {
                        this.isLoadedPromise = this.authentificationJwt()?.toPromise();
                    }
                }
            });
            if (!this.isLoadedOnce) {
                this.isLoadedPromise = this.authentificationJwt()?.toPromise();
            }
        }
    }

    public logout() {
        this._cookieService.delete(cookieJwtName);
        this.setUser(null);
    }

    public changePassword(request: IUserChangePasswordRequest): Observable<IUser> {
        return this._API.post(`${this.className}/ChangePassword`, request).pipe(
            map((user: IUser) => {
                this.setUser(user);
                return user;
            }));
    }

    public resetPassword(request: IUserResetPasswordRequest): Observable<void> {
        return this._API.post(`${this.className}/ResetPassword`, request);
    }

    public getByEmail(request: IUserGetByEmail): Promise<IUserEmailExist> {
        return this._API.getQuery<IUserEmailExist>(`${this.className}/GetByEmail`, request).toPromise();
    }

    public authentificationJwt(): Observable<IUser> | undefined {
        const tokenExist = tokenToObject(this._cookieService.get(cookieJwtName))?.jwt;
        if (!tokenExist) {
            return undefined;
        }
        
        if (!this.isLoadedOnce) {
            this.isLoadedOnce = true;
        }
        return this._API.post(`${this.className}/AuthentificationJwt`, {}).pipe(
            map((user: IUser) => {
                this.setUser(user);
                this._cookieService.set(
                    cookieJwtName,
                    JSON.stringify(user.token),
                    new Date(user.token.expiresDate).getDate());
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

    public update(request: IUserUpdateRequest): Observable<IUser> {
        return this._API.put(`${this.className}/Update`, request);
    }

    public changeRole(request: IUserChangeRoleRequest): Observable<IUser>  {
        this._userOptions = [];
        return this._API.put(`${this.className}/ChangeRole`, request);
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
