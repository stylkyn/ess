import { Component, OnInit } from '@angular/core';
import { PaymentType, IPayment } from 'src/app/models/IPayment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService, IPaymentGetByTransportRequest } from 'src/app/services/API/payment.service';
import { orderCustomerRoute } from './../order.routing';
import { Router } from '@angular/router';
import { PaymentStorageService } from './../../../../services/storage/payment.service';
import { BasketStorageService } from 'src/app/services/storage/basket.service';
import { TransportStorageService } from 'src/app/services/storage/transport.service';
import { OrderBussinessService } from './../order.service';
import { presentationOrderRoute } from 'src/app/presentation/theme/presentation-routes';
import { MapPriceTypes } from 'src/app/models/IPrice';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit {
    PaymentType = PaymentType;
    mapPriceTypes = MapPriceTypes;
    public paymentForm: FormGroup;

    public get payments (): IPayment[] {
        return this._paymentService.paymentsByTrasport;
    }

    public get activePayment(): IPayment {
        return this._paymentStorage.paymentInStorage != null ?
            this._paymentStorage.paymentInStorage : null;
    }

    constructor(
        private _paymentService: PaymentService,
        private _paymentStorage: PaymentStorageService,
        private _transportStorage: TransportStorageService,
        private _basketStorage: BasketStorageService,
        private _orderBussiness: OrderBussinessService,
        private _formBuilder: FormBuilder,
        private _router: Router
        ) {
            this.paymentForm = this._formBuilder.group({
                paymentId: [this.activePayment?.id, [Validators.required]],
            });
        }

    ngOnInit() {
        this.loadPayments();
    }

    public onChangePayment(payment: IPayment) {
        this._paymentStorage.set(payment);
        this._orderBussiness.calculateOrder();
    }

    public onNext () {
        this._router.navigateByUrl(`${presentationOrderRoute}/${orderCustomerRoute}`);
    }

    private loadPayments() {
        const request: IPaymentGetByTransportRequest = {
            hasService: this._basketStorage.hasService(),
            transportId: this._transportStorage.transportInStorage.id,
        };
        this._paymentService.fetchPaymentByTransport(request);
    }
}
