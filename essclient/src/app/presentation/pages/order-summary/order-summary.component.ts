import { Component, OnInit } from '@angular/core';
import { orderSummaryStates, IOrderStateOption, OrderState } from 'src/app/models/IOrder';
import { OrderService } from 'src/app/services/API/order.service';
import { IOrder } from './../../../models/IOrder';
import { ActivatedRoute } from '@angular/router';
import { IGetOrderRequets } from './../../../services/API/order.service';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { PaymentType } from 'src/app/models/IPayment';
import { TransportType } from 'src/app/models/ITransport';

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

    public get order(): IOrder {
        return this._orderService.activeOrder;
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
        console.log(orderSummaryStates(this.order));
        console.log(this.order);
    }
}
