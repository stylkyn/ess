import { Component, OnInit } from '@angular/core';
import { orderSummaryStates, IOrderStateOption, OrderState } from 'src/app/models/IOrder';
import { OrderService } from 'src/app/services/API/order.service';
import { IOrder } from './../../../models/IOrder';
import { ActivatedRoute } from '@angular/router';
import { IGetOrderRequets } from './../../../services/API/order.service';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { PaymentType } from 'src/app/models/IPayment';
import { ITransport, TransportType } from 'src/app/models/ITransport';
import * as moment from 'moment';
import { IPayment } from './../../../models/IPayment';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
    orderSummaryStates: (state: IOrder) => IOrderStateOption[] = orderSummaryStates;
    OrderState = OrderState;
    TransportType = TransportType;
    PaymentType = PaymentType;
    mapPriceTypes = MapPriceTypes;
    moment = moment;

    public get order(): IOrder {
        return this._orderService.activeOrder;
    }

    public get transport(): ITransport {
        return this.order.calculatedData.transport.sourceData;
    }

    public get payment(): IPayment {
        return this.order.calculatedData.payment.sourceData;
    }

    constructor(
        private _orderService: OrderService,
        private route: ActivatedRoute) { 
    }

    ngOnInit(): void {
        this.loadOrder();
    }

    private async loadOrder() {
        const request: IGetOrderRequets = {
            orderId: this.route.snapshot.paramMap.get('orderId')
        };
        await this._orderService.fetchOrder(request);
    }
}
