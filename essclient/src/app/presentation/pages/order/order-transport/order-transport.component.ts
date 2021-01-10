import { Component, OnInit } from '@angular/core';
import { TransportService } from 'src/app/services/API/transport.service';
import { ITransport, TransportType } from 'src/app/models/ITransport';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { orderPaymentRoute } from '../order.routing';
import { Router } from '@angular/router';
import { TransportStorageService } from 'src/app/services/storage/transport.service';
import { OrderBussinessService } from './../order.service';
import { presentationOrderRoute } from 'src/app/presentation/theme/presentation-routes';
import { ITransportsForOrderRequest } from './../../../../services/API/transport.service';
import { BasketStorageService } from 'src/app/services/storage/basket.service';

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
        return this._transportService.transportsForOrder;
    }

    public get activeTransport(): ITransport {
        return this._transportStorage.transportInStorage != null ?
            this._transportStorage.transportInStorage : null;
    }

    constructor(
        private _transportService: TransportService,
        private _transportStorage: TransportStorageService,
        private _basketStorage: BasketStorageService,
        private _orderBussiness: OrderBussinessService,
        private _formBuilder: FormBuilder,
        private _router: Router
        ) {
            this.transportForm = this._formBuilder.group({
                transportId: [this.activeTransport?.id, [Validators.required]],
            });
        }

    ngOnInit() {
        this.loadTransports();
    }

    onChangeTransport(transport: ITransport) {
        this._transportStorage.set(transport);
        this._orderBussiness.calculateOrder();
    }

    onNext () {
        this._router.navigateByUrl(`${presentationOrderRoute}/${orderPaymentRoute}`);
    }

    private loadTransports() {
        const request: ITransportsForOrderRequest = {
            hasService: this._basketStorage.hasService(),
        };
        this._transportService.fetchTransportsForOrder(request);
    }
}
