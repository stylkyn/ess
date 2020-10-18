import { APIService, IResponse } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { IProduct, initProduct, ProductType } from 'src/app/models/IProduct';
import { map } from 'rxjs/operators';
import { ICalculatedOrder, calculateOrderInit } from '../../models/ICalculateOrder';
import { IUserPersonal, IUserCompany } from 'src/app/models/IUser';
import { IOrder, OrderState } from 'src/app/models/IOrder';
import { Observable } from 'rxjs';
import { PaymentState } from 'src/app/models/IPayment';

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
    service: IServiceOrderRequest | null;
}

export interface IServiceOrderRequest {
    date: string;
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

export interface IOrderSearchRequest {
    userId: string;
    orderState?: OrderState | null;
    paymentState?: PaymentState | null;

    fullText: string;
    pageSize: number;
    pageNumber: number;
}

export interface ISetOrderState {
    orderId: string;
    state: OrderState;
}

export interface ISetOrderPaymentState {
    orderId: string;
    paymentState: PaymentState;
}

export interface ISetOrderAgent {
    userId: string; // agent id
    orderId: string;
}

@Injectable({
    providedIn: 'root'
})

export class OrderService extends APIRepository<IProduct> {
    public activeOrder: IOrder;
    public calculatedOrder: ICalculatedOrder = calculateOrderInit;

    constructor (public _API: APIService) {
        super(_API, 'Orders');
    }

    public get hasService(): boolean {
        return this.calculatedOrder?.products?.some(x => x.product?.type == ProductType.Servis);
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

    public fetchAccountOrders(): Observable<IOrder[]> {
        return this._API.get(`${this.className}/GetAccountOrders`);
    }

    public fetchAgentActiveOrders(): Observable<IOrder[]> {
        return this._API.get(`${this.className}/GetAgentActiveOrders`);
    }

    public fetchAgentHistoryOrders(): Observable<IOrder[]> {
        return this._API.get(`${this.className}/GetAgentHistoryOrders`);
    }

    public search(request: IOrderSearchRequest): Observable<IResponse<IOrder[]>> {
        return this._API.getQueryTotal<IOrder[]>(`${this.className}/Search`, request);
    }

    public setOrderState(request: ISetOrderState): Observable<IProduct> {
        return this._API.put(`${this.className}/SetOrderState`, request);
    }

    public setPaymentState(request: ISetOrderPaymentState): Observable<IProduct> {
        return this._API.put(`${this.className}/SetPaymentState`, request);
    }

    public setOrderAgent(request: ISetOrderAgent): Observable<IProduct> {
        return this._API.put(`${this.className}/SetOrderAgent`, request);
    }

    public verifyProductsAvailability(orderId: string): Observable<IProduct> {
        return this._API.getQuery(`${this.className}/VerifyProductsAvailability`, { orderId: orderId });
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
