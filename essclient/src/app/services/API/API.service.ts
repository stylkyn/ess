import { LoaderService } from './../loader.service';
import { catchError, map ,  tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  protected root = 'http://localhost:50432';
  public lang_code = 'cs';
  private apiRoot = `${this.root}/api/${this.lang_code}/`;

  constructor(
    private _http: HttpClient,
    private _loaderSrv: LoaderService
  ) {
  }
  /**
  * PUBLIC
  */
  // jednoduchy get bez parametru
  public get(method: string): Observable<any> {
    this.start();
    const url = this.apiRoot + method;
    console.log('GET from:' + url);

    return this._http.get<any>(url).pipe(
        tap(this.end),
        catchError(this.errorHandler));
  }

  // post
  public post(method: string, data: any): Observable<any> {
    this.start();
    const url = this.apiRoot + method;
    console.log('POST to:' + url);

    return this._http.post(url, data, this.getOptions()).pipe(
      map((x) => {
        this.successHandlerLog(url, 'POST', data);
        return x; }),
      tap(this.end),
      catchError(e => this.errorHandlerLog(e, url, 'POST', data)));
  }
  // // post without log
  // public postLogLess(method: string, data: any): Observable<any> {
  //   this.start();
  //   const url = this.apiRoot + method;
  //   console.log('POST to:' + url);

  //   return this._http.post(url, data, this.getOptions()).pipe(
  //     tap(this.end),
  //     catchError(this.errorHandler));
  // }

  // put
  public put(method: string, data: any): Observable<any> {
    this.start();
    const url = this.apiRoot + method;
    console.log('PUT to:' + url);

    return this._http.put(url, data, this.getOptions()).pipe(
      tap(this.end),
      catchError(e => this.errorHandlerLog(e, url, 'PUT', data)));
  }

  // delete
  public delete(method: string): Observable<any> {
    this.start();
    const url = this.apiRoot + method;
    console.log('DELETE in:' + url);

    return this._http.delete(url, this.getOptions()).pipe(
      tap(this.end),
      catchError(e => this.errorHandlerLog(e, url, 'DELETE', null)));
  }

  /**
  * PRIVATE
  */
  // start call API
  private start() {
    console.log(this._loaderSrv);
    this._loaderSrv.show();
  }
  // end call API
  private end() {
    console.log(this._loaderSrv);
    // this._loaderSrv.hide();
  }

  // handlery chyb
  private errorHandlerLog(error: HttpErrorResponse, url: string, method: string, data_in: any = null) {
    // const newLog: ILog = {
    //   db_type: 'API',
    //   log_type: 'error',
    //   data_in: data_in,
    //   api_method: method,
    //   api_url: url,
    //   errorCode: `${error.status} - ${error.statusText}`,
    //   errorMessage: error.message
    // };
    // this.logSubs.next(newLog);
    console.error('API error', error);
    this._loaderSrv.hide();
    return throwError(error || 'API error');
  }
  private errorHandler(error: HttpErrorResponse) {
    console.error('API error', error);
    this._loaderSrv.hide();
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
    this._loaderSrv.hide();
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
