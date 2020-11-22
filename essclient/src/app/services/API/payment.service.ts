import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPayment, PaymentType } from 'src/app/models/IPayment';
import { Observable } from 'rxjs';
import { IImage } from 'src/app/models/IImage';

export interface IPaymentQueryRequest {
    onlyActive?: boolean;
}

export interface IPaymentAddRequest {
    type: PaymentType;
    isActive: boolean;
    name: string;
    image: IImage;
    priceWithoutVat: number;
    description?: string;
}

export interface IPaymentUpdateRequest {
    id: string;
    type: PaymentType;
    isActive: boolean;
    name: string;
    priceWithoutVat: number;
    image: IImage;
    description?: string;
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
        return this._API.getQuery(`${this.className}/Search`, request).pipe(
            map((payments: IPayment[]) => {
            this.payments = payments;
            return payments;
        })).toPromise();
    }
    
    public add(request: IPaymentAddRequest): Observable<IPayment> {
        return this._API.post(`${this.className}/Add`, request);
    }

    public update(request: IPaymentUpdateRequest): Observable<IPayment> {
        return this._API.put(`${this.className}/Update`, request);
    }

    public delete(id: string): Observable<any> {
        return this._API.delete<any>(`${this.className}/Delete?Id=${id}`);
    }
}
