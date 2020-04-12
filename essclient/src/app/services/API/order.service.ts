import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { IProduct, initProduct } from 'src/app/models/IProduct';
import { map } from 'rxjs/operators';
import { ICalculatedOrder, calculateOrderInit } from './../../models/IOrder';

export interface ICalculateOrderRequest {
    products: ICalculatedOrderProductRequest[];
    transportId: string;
    paymentId: string;
}

export interface ICalculatedOrderProductRequest {
    productId: string;
    count: number;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService extends APIRepository<IProduct> {
    public calculatedOrder: ICalculatedOrder = calculateOrderInit;

    constructor(public _API: APIService) {
        super(_API, 'Orders');
    }

    public fetchCalculatedOrder(request: ICalculateOrderRequest): Promise<ICalculatedOrder> {
        return this._API.post(`${this.className}/CalculateOrder`, request).pipe(
            map((calculatedOrder: ICalculatedOrder) => {
                this.calculatedOrder = calculatedOrder;
                return calculatedOrder;
            })
        ).toPromise();
    }
}
