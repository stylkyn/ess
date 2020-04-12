import { Component, OnInit } from '@angular/core';
import { BasketStorageService } from 'src/app/services/storage/basket.service';
import { OrderService } from 'src/app/services/API/order.service';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { PaymentType } from 'src/app/models/IPayment';
import { TransportType } from 'src/app/models/ITransport';

@Component({
  selector: 'app-order-summary-card',
  templateUrl: './order-summary-card.component.html',
  styleUrls: ['./order-summary-card.component.scss']
})
export class OrderSummaryCardComponent {
    TransportType = TransportType;
    PaymentType = PaymentType;
    mapPriceTypes = MapPriceTypes;

    public get calculatedOrder () {
        return this._orderService.calculatedOrder;
    }

    constructor(
        public _orderService: OrderService,
        public _basketService: BasketStorageService,
    ) { }
}
