import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { IPayment } from 'src/app/models/IPayment';
import { Observable } from 'rxjs/observable';
import { IStats } from 'src/app/models/IStats';

export interface IPaymentQueryRequest {
    onlyActive: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class StatsService extends APIRepository<IPayment> {

    public payments: IPayment[] = [];

    constructor (public _API: APIService) {
        super(_API, 'Stats');
    }

    public fetchStats(): Observable<IStats> {
        return this._API.get<IStats>(`${this.className}/GetStats`);
    }
}
