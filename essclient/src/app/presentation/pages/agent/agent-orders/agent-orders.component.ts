import { Component, OnInit } from '@angular/core';
import { OrderStateName, IOrder, OrderState } from 'src/app/models/IOrder';
import { PaymentStateName } from 'src/app/models/IPayment';
import { getOrderRoute } from 'src/app/presentation/theme/presentation-routes';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { OrderService, ISetOrderState } from 'src/app/services/API/order.service';

@Component({
  selector: 'app-agent-orders',
  templateUrl: './agent-orders.component.html',
  styleUrls: ['./agent-orders.component.scss']
})
export class AgentOrdersComponent implements OnInit {
    OrderStateName = OrderStateName;
    PaymentStateName = PaymentStateName;
    getOrderRoute = getOrderRoute;
    MapPriceTypes = MapPriceTypes;
    dataList: IOrder[] = [];
    dataListHistory: IOrder[] = [];

    constructor (private _orderService: OrderService) { }

    ngOnInit() {
        this.loadAgentActiveOrders();
        this.loadAgentHistoryOrders();
    }

    loadAgentActiveOrders() {
        this._orderService.fetchAgentActiveOrders().subscribe(orders => this.dataList = orders);
    }

    loadAgentHistoryOrders() {
        this._orderService.fetchAgentHistoryOrders().subscribe(orders => this.dataListHistory = orders);
    }

    changeState(order: IOrder) {
        const request: ISetOrderState = {
            orderId: order.id,
            state: OrderState.Finished
        };
        this._orderService.setOrderState(request)
            .subscribe(x => { 
                this.loadAgentActiveOrders();
                this.loadAgentHistoryOrders();
            });
    }
}
