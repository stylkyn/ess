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
    console.log(this.className + ' Nastaven api');
  }

  constructor(protected _API: APIService, _className: string) {
    this.className = _className;
    console.log('service');
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
  public delete(id: string): Observable<number> {
    return this._API.delete(this.className + '/' + id);
  }
  public deleteObj(val: T): Observable<number> {
    const anyVal: any = val;
    return this._API.delete(this.className + '/' + anyVal.Id);
  }

}
