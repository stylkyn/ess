import { LoaderService } from './../loader.service';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { tokenToObject, cookieJwtName } from 'src/app/models/IUser';

let loaderSrv: LoaderService;

export interface IResponse<T> {
    data: T;
    total: number;
    message: string;
    error: Object;
}

@Injectable({
    providedIn: 'root'
})
export class APIService {

    // protected root = 'http://localhost:50432';
    protected root = 'https://elitecsoftware-api.azurewebsites.net';
    private apiRoot = `${this.root}/api/`;

    constructor (
        private _http: HttpClient,
        private _loaderSrv: LoaderService,
        private _cookieService: CookieService
    ) {
        loaderSrv = _loaderSrv;
    }
    /**
    * PUBLIC
    */
    public get<T>(method: string): Observable<T> {
        this.start();
        const url = this.apiRoot + method;

        return this._http.get<any>(url, this.getOptions()).pipe(
            map((x: IResponse<T>) => x.data),
            tap(this.end),
            catchError(this.errorHandler));
    }

    public getQuery<T>(method: string, request: Object): Observable<T> {
        this.start();
        const url = `${this.apiRoot}${method}${this.objectToQueryParams(request)}`;

        return this._http.get<any>(url, this.getOptions()).pipe(
            map((x: IResponse<T>) => x.data),
            tap(this.end),
            catchError(this.errorHandler));
    }

    public getQueryTotal<T>(method: string, request: Object): Observable<IResponse<T>> {
        this.start();
        const url = `${this.apiRoot}${method}${this.objectToQueryParams(request)}`;

        return this._http.get<any>(url, this.getOptions()).pipe(
            tap(this.end),
            catchError(this.errorHandler));
    }

    public post<T>(method: string, data: any): Observable<T> {
        this.start();
        const url = this.apiRoot + method;

        return this._http.post(url, data, this.getOptions()).pipe(
            map((x: IResponse<T>) => {
                this.successHandlerLog(url, 'POST', data);
                return x.data;
            }),
            tap(this.end),
            catchError(e => this.errorHandlerLog(e, url, 'POST', data)));
    }

    public put<T>(method: string, data: any): Observable<T> {
        this.start();
        const url = this.apiRoot + method;

        return this._http.put(url, data, this.getOptions()).pipe(
            map((x: IResponse<T>) => x.data),
            tap(this.end),
            catchError(e => this.errorHandlerLog(e, url, 'PUT', data)));
    }

    public delete<T>(method: string): Observable<any> {
        this.start();
        const url = this.apiRoot + method;

        return this._http.delete(url, this.getOptions()).pipe(
            map((x: IResponse<T>) => x.data),
            tap(this.end),
            catchError(e => this.errorHandlerLog(e, url, 'DELETE', null)));
    }

    /**
    * PRIVATE
    */

    private objectToQueryParams(object: Object) {
        const params = Object.keys(object).map(key => {
            let value = object[key];
            if (value == null || value == undefined)
                value = '';

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
        const token = tokenToObject(this._cookieService.get(cookieJwtName));
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
        headers = headers.append('Access-Control-Allow-Origin', '*');
        headers = headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', `Bearer ${token.jwt}`);
        return { headers: headers };
    }
}
