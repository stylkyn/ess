import { Injectable } from '@angular/core';
import { OrderModule } from './order.module';
import { PaymentStorageService } from 'src/app/services/storage/payment.service';
import { BasketStorageService } from 'src/app/services/storage/basket.service';
import { TransportStorageService } from 'src/app/services/storage/transport.service';
import { OrderService, ICalculateOrderRequest } from 'src/app/services/API/order.service';
import { ISetOrderRequest } from './../../../services/API/order.service';
import { CustomerStorageService } from 'src/app/services/storage/customer.service';
import { IOrder } from './../../../models/IOrder';
import { ServiceDateStorageService } from 'src/app/services/storage/service-date.service';

@Injectable({
  providedIn: OrderModule
})
export class OrderBussinessService {

    constructor(
        private _paymentStorage: PaymentStorageService,
        private _basketStorage: BasketStorageService,
        private _serviceDateStorage: ServiceDateStorageService,
        private _transportStorage: TransportStorageService,
        private _customerStorage: CustomerStorageService,
        private _orderService: OrderService,
    ) { 
    }

    public calculateOrder () {
        const productsInBasket = this._basketStorage.productsInStorage;
        const transportId = this._transportStorage.transportInStorage?.id;
        const paymentId = this._paymentStorage.paymentInStorage?.id;
        const request: ICalculateOrderRequest = {
            products: productsInBasket.map(x => ({
                productId: x.productId,
                count: x.productsCount
            })),
            transportId: transportId,
            paymentId: paymentId
        };
        this._orderService.fetchCalculatedOrder(request);
    }

    public setOrder (): Promise<IOrder> {
        const customer = this._customerStorage.customerInStorage;
        const productsInBasket = this._basketStorage.productsInStorage;
        const transportId = this._transportStorage.transportInStorage?.id;
        const servisDate = this._serviceDateStorage.servisDateInStorage;
        const paymentId = this._paymentStorage.paymentInStorage?.id;
        const request: ISetOrderRequest = {
            customer: {
                personal: customer?.personal,
                company: customer.invoiceToCompany ? {
                    companyId: customer?.company.companyId,
                    companyName: customer?.company.companyName,
                    companyVat: customer?.company.companyVat,
                    address: customer.transportToSameAddress ? customer?.company?.address : null
                } : null,
            },
            calculateOrder: {
                products: productsInBasket.map(x => ({
                    productId: x.productId,
                    count: x.productsCount
                })),
                transportId: transportId,
                paymentId: paymentId
            },
            transport: {
                transportId: transportId,
            },
            payment: {
                paymentId: paymentId
            },
            service: servisDate ? {
                date: servisDate.toISOString()
            } : null
        };
        return this._orderService.setOrder(request);
    }
}
