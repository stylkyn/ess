import { LoaderService } from './../loader.service';
import { catchError, map ,  tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

let loaderSrv: LoaderService;

interface IResponse {
  data: any | any[];
  message: string;
  error: Object;
}

@Injectable({
  providedIn: 'root'
})
export class APIService {

  protected root = 'http://localhost:50432';
  private apiRoot = `${this.root}/api/`;

  constructor(
    private _http: HttpClient,
    private _loaderSrv: LoaderService
  ) {
      loaderSrv = _loaderSrv;
  }
  /**
  * PUBLIC
  */
  // jednoduchy get bez parametru
  public get(method: string): Observable<any> {
    this.start();
    const url = this.apiRoot + method;

    return this._http.get<any>(url).pipe(
        map((x: IResponse) => x.data),
        tap(this.end),
        catchError(this.errorHandler));
  }

  // get s parametry
  public getQuery(method: string, request: Object): Observable<any> {
    this.start();
    const url = `${this.apiRoot}${method}${this.objectToQueryParams(request)}`;

    return this._http.get<any>(url).pipe(
        map((x: IResponse) => x.data),
        tap(this.end),
        catchError(this.errorHandler));
  }

  // post
  public post(method: string, data: any): Observable<any> {
    this.start();
    const url = this.apiRoot + method;

    return this._http.post(url, data, this.getOptions()).pipe(
      map((x: IResponse) => {
        this.successHandlerLog(url, 'POST', data);
        return x.data; }),
      tap(this.end),
      catchError(e => this.errorHandlerLog(e, url, 'POST', data)));
  }

  // put
  public put(method: string, data: any): Observable<any> {
    this.start();
    const url = this.apiRoot + method;

    return this._http.put(url, data, this.getOptions()).pipe(
      map((x: IResponse) => x.data),
      tap(this.end),
      catchError(e => this.errorHandlerLog(e, url, 'PUT', data)));
  }

  // delete
  public delete(method: string): Observable<any> {
    this.start();
    const url = this.apiRoot + method;

    return this._http.delete(url, this.getOptions()).pipe(
      map((x: IResponse) => x.data),
      tap(this.end),
      catchError(e => this.errorHandlerLog(e, url, 'DELETE', null)));
  }

  /**
  * PRIVATE
  */

 private objectToQueryParams(object: Object) {
    const params = Object.keys(object).map(key => {
      const value = object[key];
      return `${key}=${value}`;
    });
    return `?${params.join('&')}`;
  }

  // start call API
  private start() {
    loaderSrv.show();
  }
  // end call API
  private end() {
    loaderSrv.hide();
  }

  // handlery chyb
  private errorHandlerLog(error: HttpErrorResponse, url: string, method: string, data_in: any = null) {
    loaderSrv.hide();
    return throwError(error || 'API error');
  }
  private errorHandler(error: HttpErrorResponse) {
    console.error('API error', error);
    loaderSrv.hide();
    return throwError(error || 'API error');
  }
  // handler uspesneho dokonceni
  private async successHandlerLog(url: string, method: string, data_in: any = null) {
    // let newLog: ILog = {
    //   db_type: 'API',
    //   log_type: 'success',
    //   data_in: data_in,
    //   api_method: method,
    //   api_url: url
    // };
    // this.logSubs.next(newLog);
    loaderSrv.hide();
  }
  // vraci nastavneou hlavicku
  private getOptions(): object {
    const headers = new HttpHeaders({ 'Accept': 'application/json'});
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Content-Type', 'application/json');
    return { headers: headers };
  }
}
