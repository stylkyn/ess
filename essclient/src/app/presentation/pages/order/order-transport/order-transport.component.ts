import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ITransportQueryRequest, TransportService } from 'src/app/services/API/transport.service';
import { ITransport, TransportType } from 'src/app/models/ITransport';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { orderPaymentRoute } from '../order.routing';
import { Router } from '@angular/router';
import { TransportStorageService } from 'src/app/services/storage/transport.service';
import { OrderBussinessService } from './../order.service';
import { presentationOrderRoute } from 'src/app/presentation/theme/presentation-routes';
import { OrderService } from 'src/app/services/API/order.service';
import * as moment from 'moment';
import { ServiceDateStorageService } from 'src/app/services/storage/service-date.service';

@Component({
  selector: 'app-order-transport',
  templateUrl: './order-transport.component.html',
  styleUrls: ['./order-transport.component.scss']
})
export class OrderTransportComponent implements OnInit {
    TransportType = TransportType;
    mapPriceTypes = MapPriceTypes;
    
    public transportForm: FormGroup;

    public get showServiceCard(): boolean {
        return this._orderService?.hasService;
    }

    public get selectedServisDate(): moment.Moment {
        return this._serviceDateStorage?.servisDateInStorage;
    }

    public get calculatedOrder () {
        return this._orderService.calculatedOrder;
    }

    public get transports (): ITransport[] {
        return this._transportService.transports;
    }

    private get transportStorageType () {
        return this._transportStorage.transportInStorage != null ?
            this._transportStorage.transportInStorage.type : null;
    }

    constructor(
        private _transportService: TransportService,
        private _serviceDateStorage: ServiceDateStorageService,
        private _orderService: OrderService,
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

    selectedDate(date: moment.Moment) {
        this._serviceDateStorage.set(date);
    }

    onChangeTransport(transport: ITransport) {
        this._transportStorage.set(transport);
        this._orderBussiness.calculateOrder();
    }

    onNext () {
        this._router.navigateByUrl(`${presentationOrderRoute}/${orderPaymentRoute}`);
    }

    invalidDateFunction(day: moment.Moment) {
        return this.calculatedOrder?.products
            .filter(p => p.product.servis != null)
            .some(p => p.product.servis.availabilities
                .some(a => a.day == day.toLocaleString() && a.freeCapacity <= 0));
    }

    private loadTransports() {
        const request: ITransportQueryRequest = {
            onlyActive: true
        };
        this._transportService.fetchTransport(request);
    }
}
