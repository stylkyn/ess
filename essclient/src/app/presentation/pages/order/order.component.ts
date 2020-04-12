import { Component, OnInit } from '@angular/core';
import { orderTransportRoute, orderBasketRoute, orderPaymentRoute, orderCustomerRoute, orderSummaryRoute } from './order.routing';

@Component({
    selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    orderTransportRoute = orderTransportRoute;
    orderBasketRoute = orderBasketRoute;
    orderPaymentRoute = orderPaymentRoute;
    orderCustomerRoute = orderCustomerRoute;
    orderSummaryRoute = orderSummaryRoute;

    constructor() { }

    ngOnInit() {
    }

}
