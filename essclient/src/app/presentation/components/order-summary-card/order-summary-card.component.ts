import { Component, OnInit } from '@angular/core';
import { BasketStorageService } from 'src/app/services/storage/basket.service';
import { OrderService } from 'src/app/services/API/order.service';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { IPayment, PaymentType } from 'src/app/models/IPayment';
import { ITransport, TransportType } from 'src/app/models/ITransport';
import { IOrder } from 'src/app/models/IOrder';
import { ICalculatedOrderProductOrder } from 'src/app/models/ICalculateOrder';

@Component({
  selector: 'app-order-summary-card',
  templateUrl: './order-summary-card.component.html',
  styleUrls: ['./order-summary-card.component.scss']
})
export class OrderSummaryCardComponent {
    TransportType = TransportType;
    PaymentType = PaymentType;
    mapPriceTypes = MapPriceTypes;

    public get order(): IOrder {
        return this._orderService?.activeOrder;
    }
    
    public get products(): ICalculatedOrderProductOrder[] {
        return this._orderService?.calculatedOrder?.products ?? [];
    }

    public get transport(): ITransport {
        return this.order?.calculatedData?.transport?.sourceData;
    }

    public get payment(): IPayment {
        return this.order?.calculatedData?.payment?.sourceData;
    }

    constructor(
        public _orderService: OrderService,
        public _basketService: BasketStorageService,
    ) { }
}
