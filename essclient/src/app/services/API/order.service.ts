import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { IProduct, initProduct } from 'src/app/models/IProduct';
import { map } from 'rxjs/operators';
import { ICalculatedOrder, calculateOrderInit } from '../../models/ICalculateOrder';
import { IUserPersonal, IUserCompany } from 'src/app/models/IUser';
import { IOrder } from 'src/app/models/IOrder';

export interface IGetOrderRequets {
    orderId: string;
}

export interface ICalculateOrderRequest {
    products: ICalculatedOrderProductRequest[];
    transportId: string;
    paymentId: string;
}

export interface ICalculatedOrderProductRequest {
    productId: string;
    count: number;
}

export interface ISetOrderRequest {
    customer: IOrderCustomerRequest;
    transport: IOrderTransportRequest;
    payment: IOrderPaymentRequest;
    calculateOrder: ICalculateOrderRequest;
}

export interface IOrderCustomerRequest {
    personal: IUserPersonal;
    company: IUserCompany;
}

export interface IOrderTransportRequest {
    transportId: string;
}

export interface IOrderPaymentRequest {
    paymentId: string;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService extends APIRepository<IProduct> {
    public activeOrder: IOrder;
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

    public fetchOrder(request: IGetOrderRequets): Promise<IOrder> {
        return this._API.getQuery(`${this.className}/GetOrder`, request).pipe(
            map((order: IOrder) => {
                this.activeOrder = order;
                return order;
            })
        ).toPromise();
    }

    public setOrder(request: ISetOrderRequest): Promise<IOrder> {
        return this._API.post(`${this.className}/SetOrder`, request).pipe(
            map((order: IOrder) => {
                this.activeOrder = order;
                return order;
            })
        ).toPromise();
    }
}
