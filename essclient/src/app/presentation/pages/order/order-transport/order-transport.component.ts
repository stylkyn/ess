import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ITransportQueryRequest, TransportService } from 'src/app/services/API/transport.service';
import { ITransport, TransportType } from 'src/app/models/ITransport';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { orderRoute, orderPaymentRoute } from '../order.routing';
import { Router } from '@angular/router';
import { TransportStorageService } from 'src/app/services/storage/transport.service';
import { ICalculateOrderRequest, OrderService } from 'src/app/services/API/order.service';
import { BasketStorageService } from 'src/app/services/storage/basket.service';
import { PaymentStorageService } from './../../../../services/storage/payment.service';
import { OrderBussinessService } from './../order.service';

@Component({
  selector: 'app-order-transport',
  templateUrl: './order-transport.component.html',
  styleUrls: ['./order-transport.component.scss']
})
export class OrderTransportComponent implements OnInit {
    TransportType = TransportType;
    mapPriceTypes = MapPriceTypes;
    
    public transportForm: FormGroup;

    public get transports (): ITransport[] {
        return this._transportService.transports;
    }

    private get transportStorageType () {
        return this._transportStorage.transportInStorage != null ?
            this._transportStorage.transportInStorage.type : null;
    }

    constructor(
        private _transportService: TransportService,
        private _transportStorage: TransportStorageService,
        private _orderBussiness: OrderBussinessService,
        private _formBuilder: FormBuilder,
        private _router: Router
        ) {
            this.transportForm = this._formBuilder.group({
                transportType: [this.transportStorageType, [Validators.required]],
            });
        }

    ngOnInit() {
        this.loadTransports();
    }

    public onChangeTransport(transport: ITransport) {
        this._transportStorage.set(transport);
        this._orderBussiness.calculateOrder();
    }

    public onNext () {
        this._router.navigateByUrl(`${orderRoute}/${orderPaymentRoute}`);
    }

    private loadTransports() {
        const request: ITransportQueryRequest = {
            onlyActive: true
        };
        this._transportService.fetchTransport(request);
    }
}
