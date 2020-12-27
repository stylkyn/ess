import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IPaymentAddRequest, IPaymentUpdateRequest, PaymentService } from 'src/app/services/API/payment.service';
import { IImage } from '../../../../models/IImage';
import { FileUploadComponent } from '../../../components/file-upload/file-upload.component';
import { IPayment, PaymentType } from '../../../../models/IPayment';
import { getPaymentTypeName } from 'src/app/models/IPayment';

// tslint:disable-next-line:no-bitwise
type Type = 'update' | 'add';

@Component({
    selector: 'app-payment-form',
    templateUrl: './payment-form.component.html',
    styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent {
    PaymentType = PaymentType;   
    getPaymentTypeName = getPaymentTypeName;
    @Output() changeData = new EventEmitter<IPayment>();
    @ViewChild('mainImageUploader') mainImageUploader: FileUploadComponent;
    
    activePayment: IPayment;
    mainImage: IImage;
    paymentForm: FormGroup;
    visible = false;
    isLoading = false;

    get formType (): Type {
        return this.activePayment ? 'update' : 'add';
    }

    get type () { return this.paymentForm.get('type'); }
    get name () { return this.paymentForm.get('name'); }
    get description () { return this.paymentForm.get('description'); }
    get isActive () { return this.paymentForm.get('isActive'); }
    get price () { return this.paymentForm.get('price'); }

    constructor (
        private _fb: FormBuilder,
        private _paymentService: PaymentService,
    ) { 
        this.paymentForm = _fb.group({
            type: [PaymentType.CashOnDelivery, Validators.required],
            name: ['', Validators.required],
            description: [''],
            isActive: [true, Validators.required],
            price: [null, [Validators.required, Validators.min(0)]],
        });
    }

    // price input set currency
    formatterCurrency = (value: number) => value || value == 0 ? `${value} Kč` : '';
    parserCurrency = (value: string) => value || value == '0' ? value.replace(' Kč', '') : '';

    // main image set
    mainImageChanged(image: IImage) {
        this.mainImage = image;
    }

    // drawer actions
    open(payment: IPayment = null): void {
        this.reset();
        this.activePayment = payment;
        this.visible = true;
        if (payment) {
            this.type.setValue(payment.type);
            this.name.setValue(payment.name);
            this.description.setValue(payment.description);
            this.price.setValue(payment.totalPrice?.czkWithoutVat);
            this.isActive.setValue(payment.isActive);
            this.mainImage = payment.image;
        }
    }

    close(): void {
        this.visible = false;
        this.activePayment = null;
    }

    confirm(): void {
        if (this.formType == 'add')
            this.add();
        else if (this.formType == 'update')
            this.update();

    }

    private reset() {
        this.paymentForm.reset();
        this.paymentForm.patchValue({
            type: PaymentType.CashOnDelivery,
            isActive: true,
        });
        this.mainImageUploader.reset();
        this.mainImage = null;
    }

    private add(): void {
        this.isLoading = true;
        const request: IPaymentAddRequest = {
            name: this.name.value,
            image: this.mainImage,
            description: this.description.value,
            type: this.type.value,
            isActive: this.isActive.value,
            priceWithoutVat: this.price.value,
        };
        this._paymentService.add(request).subscribe((payment: IPayment) => {
            this.changeData.next(payment);
            this.reset();
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }

    private update(): void {
        this.isLoading = true;
        const request: IPaymentUpdateRequest = {
            id: this.activePayment?.id,
            name: this.name.value,
            image: this.mainImage,
            description: this.description.value,
            type: this.type.value,
            isActive: this.isActive.value,
            priceWithoutVat: this.price.value,
        };
        this._paymentService.update(request).subscribe((payment: IPayment) => {
            this.changeData.next(payment);
            this.reset();
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }
}
