import { APIService } from './API.service';
// import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
export class APIRepository<T> {

  protected className: string;

  // Internal SET
  protected setClassName(className: string) {
    this.className = className;
  }

  constructor(protected _API: APIService, _className: string) {
    this.className = _className;
  }

  public getByID(id: number): Observable<T> {
    return this._API.get(this.className + '/Get/' + id);
  }
   /**
   * SET
   */
  public add(val: T): Observable<T> {
    return this._API.post(this.className, val);
  }
  public update(val: T): Observable<T> {
    return this._API.put(this.className, val);
  }

}
