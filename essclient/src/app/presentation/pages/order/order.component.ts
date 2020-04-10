import { Component, OnInit } from '@angular/core';
import { orderTransportRoute, orderBasketRoute, orderPaymentRoute } from './order.routing';

@Component({
    selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    public orderTransportRoute = orderTransportRoute;
    public orderBasketRoute = orderBasketRoute;
    public orderPaymentRoute = orderPaymentRoute;

    constructor() { }

    ngOnInit() {
    }

}
