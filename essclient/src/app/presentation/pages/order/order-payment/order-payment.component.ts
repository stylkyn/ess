import { Component, OnInit } from '@angular/core';
import { PaymentType, IPayment } from 'src/app/models/IPayment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService, IPaymentQueryRequest } from 'src/app/services/API/payment.service';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit {
    PaymentType = PaymentType;
    public paymentForm: FormGroup;

    public get payments (): IPayment[] {
        return this._paymentService.payments;
    }

    constructor(
        private _paymentService: PaymentService,
        private _formBuilder: FormBuilder,
        ) {
            this.paymentForm = this._formBuilder.group({
                paymentType: [null, [Validators.required]],
            });
        }

    ngOnInit() {
        this.loadPayments();
    }

    public loadPayments() {
        const request: IPaymentQueryRequest = {
            onlyActive: true
        };
        this._paymentService.fetchPayment(request);
    }

}
