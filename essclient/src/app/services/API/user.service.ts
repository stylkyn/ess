import { ILogin } from '../../models/ILogin';
import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { ISocialLogin } from 'src/app/models/ISocialLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService extends APIRepository<IUser> {

  constructor(public _API: APIService) {
    super(_API, 'user');
    console.log(' construtor user');
  }

  public verifyLogin(login: ILogin): Observable<IUser> {
    return this._API.post(`${this.className}/VerifyLogin`, login);
  }

  public verifySocialLogin(socialLogin: ISocialLogin): Observable<IUser> {
    return this._API.post(`${this.className}/VerifySocialLogin`, socialLogin);
  }
}
