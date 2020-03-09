import { ILogin } from '../../models/ILogin';
import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { ISocialLogin } from 'src/app/models/ISocialLogin';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends APIRepository<IUser> {

    private user: IUser;

    public get getUser() {
        return this.user;
    }

    constructor(public _API: APIService, private _cookieService: CookieService) {
        super(_API, 'user');
    }

    public verifyLogin(login: ILogin): Observable<IUser> {
        return this._API.post(`${this.className}/VerifyLogin`, login).pipe(
            map((user: IUser) => {
                this.user = user;
                this._cookieService.set('jwt', user.token.jwt);

                console.log(this.user);
                return user;
            }));
    }

  public verifySocialLogin(socialLogin: ISocialLogin): Observable<IUser> {
    return this._API.post(`${this.className}/VerifySocialLogin`, socialLogin);
  }
}
