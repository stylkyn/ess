import { Component, OnInit, ViewChild } from '@angular/core';
import { TransportService } from '../../../services/API/transport.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { getTransportTypeName, ITransport, TransportType } from 'src/app/models/ITransport';
import { ITransportQueryRequest } from './../../../services/API/transport.service';
import { TransportFormComponent } from './transport-form/transport-form.component';

@Component({
    selector: 'app-transport',
    templateUrl: './transport.component.html',
    styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {
    MapPriceTypes = MapPriceTypes;
    TransportType = TransportType;
    getTransportTypeName = getTransportTypeName;
    @ViewChild('transportForm') transportForm: TransportFormComponent;

    dataList: ITransport[] = [];
    loading = true;
    visibleRemovePopup: boolean;

    constructor (
        private _transportService: TransportService, 
        private _modalNz: NzModalService,
        ) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.loading = true;

        const request: ITransportQueryRequest = {
            onlyActive: false,
        };
        this._transportService.fetchTransport(request).then(transports => {
            this.loading = false;
            this.dataList = transports;
        }, () => this.loading = false);
    }
    

    // update logic
    showUpdateDrawer(transport: ITransport) {
        this.transportForm.open(transport);
    }

    // remove logic
    removeTransport(transport: ITransport) {
        this._transportService.delete(transport.id).subscribe(x => {
            this.loadData();
        });
    }

    showDeleteConfirm(transport: ITransport): void {
        this._modalNz.confirm({
            nzTitle: `Opravdu chcete smazat tento způsob přepravy?`,
            nzContent: `<b style="color: red;">${transport.name}</br>`,
            nzOkText: 'Smazat',
            nzOkType: 'danger',
            nzOnOk: () => this.removeTransport(transport),
            nzCancelText: 'Zrušit'
        });
    }
}
