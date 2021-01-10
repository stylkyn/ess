import { Component, OnInit } from '@angular/core';
import { orderTransportRoute, orderBasketRoute, orderPaymentRoute, orderCustomerRoute } from './order.routing';
import { BasketStorageService } from 'src/app/services/storage/basket.service';
import { TransportStorageService } from 'src/app/services/storage/transport.service';
import { PaymentStorageService } from './../../../services/storage/payment.service';
import { CustomerStorageService } from 'src/app/services/storage/customer.service';
import { OrderBussinessService } from './order.service';
import { presentationOrderSummaryRoute } from '../../theme/presentation-routes';
import { MDBModalService } from 'ng-uikit-pro-standard';

@Component({
    selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
    orderBasketRoute = orderBasketRoute;
    orderTransportRoute = orderTransportRoute;
    orderPaymentRoute = orderPaymentRoute;
    orderCustomerRoute = orderCustomerRoute;
    presentationOrderSummaryRoute = presentationOrderSummaryRoute;

    get isProductsValid () {
        return this._basketStorage.productsInStorage.length > 0;
    }

    get isTransportValid () {
        return this.isProductsValid && this._transportStorage.transportInStorage != null;
    }

    get isPaymentValid () {
        return this.isTransportValid && this._paymentStorage.paymentInStorage != null;
    }

    get isCustomerValid () {
        return this.isPaymentValid && this._customerStorage.customerInStorage != null;
    }

    constructor(
        private _basketStorage: BasketStorageService,
        private _transportStorage: TransportStorageService,
        private _paymentStorage: PaymentStorageService,
        private _customerStorage: CustomerStorageService,
        private _orderBussiness: OrderBussinessService,
        private _modalService: MDBModalService
        ) { 
    }

    ngOnInit(): void {
        this._modalService.hide(2);
        this._orderBussiness.calculateOrder();
    }
}
