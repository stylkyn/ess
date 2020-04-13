import { Component, OnInit } from '@angular/core';
import { orderSummaryStates, IOrderStateOption, OrderState } from 'src/app/models/IOrder';
import { OrderService } from 'src/app/services/API/order.service';
import { IOrder } from './../../../models/IOrder';
import { ActivatedRoute } from '@angular/router';
import { IGetOrderRequets } from './../../../services/API/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
    orderSummaryStates: (state: IOrder) => IOrderStateOption[] = orderSummaryStates;
    OrderState = OrderState;

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

    private loadOrder() {
        const request: IGetOrderRequets = {
            orderId: this.route.snapshot.paramMap.get('orderId')
        };
        this._orderService.fetchOrder(request);
    }
}
