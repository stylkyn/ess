import { Injectable } from '@angular/core';
import { OrderModule } from './order.module';
import { PaymentStorageService } from 'src/app/services/storage/payment.service';
import { BasketStorageService } from 'src/app/services/storage/basket.service';
import { TransportStorageService } from 'src/app/services/storage/transport.service';
import { OrderService, ICalculateOrderRequest } from 'src/app/services/API/order.service';

@Injectable({
  providedIn: OrderModule
})
export class OrderBussinessService {

    constructor(
        private _paymentStorage: PaymentStorageService,
        private _basketStorage: BasketStorageService,
        private _transportStorage: TransportStorageService,
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

    public setOrder () {
    }
}
