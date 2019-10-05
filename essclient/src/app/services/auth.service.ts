import { IUser } from './../model/IUser';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: IUser;

  public get user() {
    return this._user;
  }

  public setUser(user: IUser): void {
    this._user = user;
  }

  constructor() {

  }

}
