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
import { NzModalService } from 'ng-zorro-antd/modal';
import { email, gt, lte,  } from '@ng-validators/ng-validators';
import { getCountriesOptions } from 'src/app/models/ICounter';

type Type = 'update' | 'add';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
    @Output() changeData = new EventEmitter<IOrder>();

    countriesOptions = getCountriesOptions();

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
        private _modalNz: NzModalService,
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
                    postalCode: [null, [Validators.required, Validators.minLength(5)]],
                    city: [null, Validators.required],
                    street: [null, Validators.required],
                    houseNumber: [null, Validators.required],
                }),
                contact: this._formBuilder.group({
                    phone: [420, Validators.required],
                    email: [null, [Validators.required, email]],
                }),
            }),
            company: this._formBuilder.group({
                companyName: [null],
                companyId: [null],
                companyVat: ['CZ'],
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

    showDeleteConfirm(product: ICalculatedOrderProductOrder, index: number): void {
        this._modalNz.confirm({
            nzTitle: `Opravdu chcete smazat tento produkt?`,
            nzContent: `<b style="color: red;">${product?.product.name}</br>`,
            nzOkText: 'Smazat',
            nzOkType: 'danger',
            nzOnOk: () => {
                this.removeProductFromControls(product);
            },
            nzCancelText: 'Zrušit'
        });
    }

    getProductById(productId: string): ICalculatedOrderProductOrder {
        return this.activeOrder?.calculatedData?.products?.find(p => p.product.id == productId);
    }

    // drawer actions
    open(order: IOrder = null): void {
        this.reset();
        this.visible = true;

        if (order) {
            this.orderForm.patchValue({
                calculateOrder: {
                    paymentId: order.calculatedData?.payment?.paymentId,
                    transportId: order.calculatedData?.transport?.transportId,
                    products: []
                },
                personal: {
                    firstname: order.customer?.personal?.firstname,
                    lastname: order.customer?.personal?.lastname,
                    address: {
                        country: order.customer?.personal?.address?.country,
                        postalCode: order.customer?.personal?.address?.postalCode,
                        city: order.customer?.personal?.address?.city,
                        street: order.customer?.personal?.address?.street,
                        houseNumber: order.customer?.personal?.address?.houseNumber,
                    },
                    contact: {
                        phone: order.customer?.personal?.contact?.phone,
                        email: order.customer?.personal?.contact?.email,
                    },
                },
                company: {
                    companyName: order.customer?.company?.companyName,
                    companyId: order.customer?.company?.companyId,
                    companyVat: order.customer?.company?.companyVat,
                    address: this._formBuilder.group({
                        country: order.customer?.company?.address?.country,
                        postalCode: order.customer?.company?.address?.postalCode,
                        city: order.customer?.company?.address?.city,
                        street: order.customer?.company?.address?.street,
                        houseNumber: order.customer?.company?.address?.houseNumber,
                    })
                },
            });
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
            count: [product.count, [Validators.required, gt(0), lte(100)]],
        }, {
            validator: (group: any) => {
                let errors = {};
                if (product.service?.date && !group.value.serviceDate) {
                    errors = { ...errors, serviceDate: true };
                }

                if (group.value.count <= 0) {
                    errors = { ...errors, count: true };
                }
                return errors;
            }
        });
    }

    private removeProductFromControls(product: ICalculatedOrderProductOrder) {
        this.products.controls = this.products.controls.filter(control => control.value.productId != product.product.id);
    }

    private reset() {
        this.orderForm.reset();
        this.products.controls = [];
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
                products: this.products.controls.map(control => ({
                    productId: control.value.productId,
                    serviceDate: control.value.serviceDate,
                    count: control.value.count,
                })),
            }
        };

        this._orderService.updateOrder(request).subscribe((user: IOrder) => {
            this.changeData.next(user);
            this.reset();
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }
}
