import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ITransport, TransportType } from 'src/app/models/ITransport';
import { Observable } from 'rxjs';
import { IImage } from 'src/app/models/IImage';

export interface ITransportQueryRequest {
    onlyActive?: boolean;
}

export interface ITransportAddRequest {
    type: TransportType;
    isActive: boolean;
    name: string;
    image: IImage;
    priceWithoutVat: number;
    description?: string;
}

export interface ITransportUpdateRequest {
    id: string;
    type: TransportType;
    isActive: boolean;
    name: string;
    priceWithoutVat: number;
    image: IImage;
    description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransportService extends APIRepository<ITransport> {

    public transports: ITransport[] = [];

    constructor(public _API: APIService) {
        super(_API, 'transports');
    }

    public async fetchTransport(request: ITransportQueryRequest): Promise<ITransport[]> {
        return this._API.getQuery(`${this.className}/Search`, request).pipe(
            map((transports: ITransport[]) => {
            this.transports = transports;
            return transports;
        })).toPromise();
    }

    public add(request: ITransportAddRequest): Observable<ITransport> {
        return this._API.post(`${this.className}/Add`, request);
    }

    public update(request: ITransportUpdateRequest): Observable<ITransport> {
        return this._API.put(`${this.className}/Update`, request);
    }

    public delete(id: string): Observable<any> {
        return this._API.delete<any>(`${this.className}/Delete?Id=${id}`);
    }
}
