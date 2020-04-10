import { Component, OnInit } from '@angular/core';
import { ITransportQueryRequest, TransportService } from 'src/app/services/API/transport.service';
import { ITransport, TransportType } from 'src/app/models/ITransport';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { orderRoute, orderPaymentRoute } from '../order.routing';
import { Router } from '@angular/router';

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

    constructor(
        private _transportService: TransportService,
        private _formBuilder: FormBuilder,
        private _router: Router
        ) {
            this.transportForm = this._formBuilder.group({
                transportType: [null, [Validators.required]],
            });
        }

    ngOnInit() {
        this.loadTransports();
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
