import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ICalculatedOrderProductOrder } from 'src/app/models/ICalculateOrder';
import { IOrder } from 'src/app/models/IOrder';
import { IUpdateOrderRequest } from 'src/app/services/API/order.service';
import { TransportService } from 'src/app/services/API/transport.service';
import { OrderService } from '../../../../services/API/order.service';
import { PaymentService } from './../../../../services/API/payment.service';
import { ITransport } from 'src/app/models/ITransport';
import { IPayment } from './../../../../models/IPayment';

type Type = 'update' | 'add';

@Component({
    selector: 'app-user-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
    @Output() changeData = new EventEmitter<IOrder>();

    activeOrder: IOrder;
    orderForm: FormGroup;
    visible = false;
    isLoading = false;

    get formType (): Type {
        return this.activeOrder ? 'update' : 'add';
    }

    get transports(): ITransport[] {
        return this._transportService.transports;
    }

    get payments(): IPayment[] {
        return this._paymentService.payments;
    }

    // calculateOrder
    get calculateOrder () { return this.orderForm.get('calculateOrder'); }
    get products (): FormArray { return this.orderForm.get('calculateOrder.products') as FormArray; }
    get paymentId () { return this.orderForm.get('calculateOrder.paymentId'); }
    get transportId () { return this.orderForm.get('calculateOrder.transportId'); }

    // personal
    get personal () { return this.orderForm.get('personal'); }
    get firstname () { return this.orderForm.get('personal.firstname'); }
    get lastname () { return this.orderForm.get('personal.lastname'); }

    get country () { return this.orderForm.get('personal.address.country'); }
    get postalCode () { return this.orderForm.get('personal.address.postalCode'); }
    get city () { return this.orderForm.get('personal.address.city'); }
    get street () { return this.orderForm.get('personal.address.street'); }
    get houseNumber () { return this.orderForm.get('personal.address.houseNumber'); }

    get phone () { return this.orderForm.get('personal.contact.phone'); }
    get email () { return this.orderForm.get('personal.contact.email'); }

    get password () { return this.orderForm?.get('personal.password'); }
    get passwordConfirm () { return this.orderForm?.get('personal.passwordConfirm'); }

    // company
    get company () { return this.orderForm.get('company'); }
    get companyName () { return this.orderForm.get('company.companyName'); }
    get companyId () { return this.orderForm.get('company.companyId'); }
    get companyVat () { return this.orderForm.get('company.companyVat'); }

    get companyCountry () { return this.orderForm.get('company.address.country'); }
    get companyPostalCode () { return this.orderForm.get('company.address.postalCode'); }
    get companyCity () { return this.orderForm.get('company.address.city'); }
    get companyStreet () { return this.orderForm.get('company.address.street'); }
    get companyHouseNumber () { return this.orderForm.get('company.address.houseNumber'); }

    constructor (
        private _formBuilder: FormBuilder,
        private _orderService: OrderService,
        private _transportService: TransportService,
        private _paymentService: PaymentService,
    ) { 
        this.orderForm = this._formBuilder.group({
            calculateOrder: this._formBuilder.group({
                paymentId: [null, Validators.required],
                transportId: [null, Validators.required],
                products: this._formBuilder.array([])
            }),
            personal: this._formBuilder.group({
                firstname: [null, Validators.required],
                lastname: [null, Validators.required],
                address: this._formBuilder.group({
                    country: ['Česká Republika', Validators.required],
                    postalCode: [null, Validators.required],
                    city: [null, Validators.required],
                    street: [null, Validators.required],
                    houseNumber: [null, Validators.required],
                }),
                contact: this._formBuilder.group({
                    phone: [null, Validators.required],
                    email: [null, Validators.required],
                }),
            }),
            company: this._formBuilder.group({
                companyName: [null],
                companyId: [null],
                companyVat: [null],
                address: this._formBuilder.group({
                    country: ['Česká Republika'],
                    postalCode: [null],
                    city: [null],
                    street: [null],
                    houseNumber: [null],
                })
            }),
        }, {
            validator: (group: any) => {
                return null;
            }
        });
    }

    // drawer actions
    open(order: IOrder = null): void {
        this.reset();
        this.visible = true;

        if (order) {
            this.orderForm.patchValue(order);
            this.activeOrder = order;
            this.activeOrder.calculatedData.products.forEach((product: ICalculatedOrderProductOrder) => {
                this.products.push(this.createProductItem(product));
            });
        }
    }

    close(): void {
        this.visible = false;
        this.activeOrder = null;
    }

    confirm(): void {
        this.update();
    }

    private createProductItem(product: ICalculatedOrderProductOrder): FormGroup {
        return this._formBuilder.group({
            productId: product.product.id,
            serviceDate: product.service?.date,
            count: product.count,
        });
      }

    private reset() {
        this.orderForm.reset();
    }

    private update(): void {
        this.isLoading = true;
        const request: IUpdateOrderRequest = {
            orderId: this.activeOrder?.id,
            customer: {
                personal: this.personal.value,
                company: this.company.value, 
            },
            calculateOrder: {
                paymentId: this.paymentId.value,
                transportId: this.transportId.value,
                products: this.products.value,
            }
        };
        console.log(request);

        this._orderService.updateOrder(request).subscribe((user: IOrder) => {
            this.changeData.next(user);
            this.reset();
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }
}
