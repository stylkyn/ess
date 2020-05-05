import { Component, OnInit } from '@angular/core';
import { orderTransportRoute, orderBasketRoute, orderPaymentRoute, orderCustomerRoute } from './order.routing';
import { BasketStorageService } from 'src/app/services/storage/basket.service';
import { TransportStorageService } from 'src/app/services/storage/transport.service';
import { PaymentStorageService } from './../../../services/storage/payment.service';
import { CustomerStorageService } from 'src/app/services/storage/customer.service';
import { Router } from '@angular/router';
import { OrderBussinessService } from './order.service';
import { presentationOrderSummaryRoute, presentationOrderRoute } from '../../theme/presentation-routes';

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
        private _router: Router
        ) { 
            if (this.isCustomerValid)
                    this._router.navigateByUrl(`${presentationOrderRoute}/${orderCustomerRoute}`);
            else if (this.isPaymentValid)
                    this._router.navigateByUrl(`${presentationOrderRoute}/${orderPaymentRoute}`);
            else if (this.isTransportValid)
                    this._router.navigateByUrl(`${presentationOrderRoute}/${orderTransportRoute}`);
            else this._router.navigateByUrl(`${presentationOrderRoute}/${orderBasketRoute}`);
    }

    ngOnInit(): void {
        this._orderBussiness.calculateOrder();
    }
}
