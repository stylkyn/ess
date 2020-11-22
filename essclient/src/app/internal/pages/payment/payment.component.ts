import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../../../services/API/payment.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { getPaymentTypeName, IPayment, PaymentType } from 'src/app/models/IPayment';
import { IPaymentQueryRequest } from '../../../services/API/payment.service';
import { PaymentFormComponent } from './payment-form/payment-form.component';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    MapPriceTypes = MapPriceTypes;
    PaymentType = PaymentType;
    getPaymentTypeName = getPaymentTypeName;
    @ViewChild('paymentForm') paymentForm: PaymentFormComponent;

    dataList: IPayment[] = [];
    loading = true;
    visibleRemovePopup: boolean;

    constructor (
        private _paymentService: PaymentService, 
        private _modalNz: NzModalService,
        ) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        console.log('loaddata');
        this.loading = true;

        const request: IPaymentQueryRequest = { };
        this._paymentService.fetchPayment(request).then(payments => {
            this.loading = false;
            this.dataList = payments;
        }, () => this.loading = false);
    }
    

    // update logic
    showUpdateDrawer(payment: IPayment) {
        this.paymentForm.open(payment);
    }

    // remove logic
    removePayment(payment: IPayment) {
        this._paymentService.delete(payment.id).subscribe(x => {
            this.loadData();
        });
    }

    showDeleteConfirm(payment: IPayment): void {
        this._modalNz.confirm({
            nzTitle: `Opravdu chcete smazat tento způsob platby?`,
            nzContent: `<b style="color: red;">${payment.name}</br>`,
            nzOkText: 'Smazat',
            nzOkType: 'danger',
            nzOnOk: () => this.removePayment(payment),
            nzCancelText: 'Zrušit'
        });
    }
}
