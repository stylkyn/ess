import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { IPayment } from 'src/app/models/IPayment';

export interface IPaymentQueryRequest {
    onlyActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends APIRepository<IPayment> {

  public payments: IPayment[] = [];

  constructor(public _API: APIService) {
    super(_API, 'Payments');
  }

  public async fetchPayment(request: IPaymentQueryRequest): Promise<IPayment[]> {
    if (this.payments.length === 0) {
      return this._API.getQuery(`${this.className}/Search`, request).pipe(
        map((payments: IPayment[]) => {
          this.payments = payments;
          return payments;
      })).toPromise();
    }
    return new Promise((resolve) => resolve(this.payments));
  }
}
