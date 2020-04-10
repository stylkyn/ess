import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ITransport } from 'src/app/models/ITransport';

export interface ITransportQueryRequest {
    onlyActive: boolean;
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
    if (this.transports.length === 0) {
      return this._API.getQuery(`${this.className}/Search`, request).pipe(
        map((transports: ITransport[]) => {
          this.transports = transports;
          return transports;
      })).toPromise();
    }
    return new Promise((resolve) => resolve(this.transports));
  }
}
