import { Component, OnInit } from '@angular/core';
import { IOrder, OrderStateName } from './../../../../models/IOrder';
import { OrderService } from './../../../../services/API/order.service';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { PaymentStateName } from 'src/app/models/IPayment';
import { getOrderRoute } from 'src/app/presentation/theme/presentation-routes';

@Component({
    selector: 'app-my-order',
    templateUrl: './my-order.component.html',
    styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
    OrderStateName = OrderStateName;
    PaymentStateName = PaymentStateName;
    getOrderRoute = getOrderRoute;
    MapPriceTypes = MapPriceTypes;
    dataList: IOrder[] = [];

    constructor (private _orderService: OrderService) { }

    ngOnInit() {
        this._orderService.fetchAccountOrders().subscribe(orders => this.dataList = orders);
    }

}
