import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { orderRoute, orderSummaryRoute } from '../order.routing';
import { CustomerStorageService, ICustomerStorage } from 'src/app/services/storage/customer.service';

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.scss']
})
export class OrderCustomerComponent implements OnInit {
    customerForm: FormGroup;

    // personal
    get firstname () { return this.customerForm.get('personal.firstname'); }
    get lastname () { return this.customerForm.get('personal.lastname'); }

    get country () { return this.customerForm.get('personal.address.country'); }
    get postalCode () { return this.customerForm.get('personal.address.postalCode'); }
    get city () { return this.customerForm.get('personal.address.city'); }
    get street () { return this.customerForm.get('personal.address.street'); }
    get houseNumber () { return this.customerForm.get('personal.address.houseNumber'); }

    get phone () { return this.customerForm.get('personal.contact.phone'); }
    get email () { return this.customerForm.get('personal.contact.email'); }


    // company
    get invoiceToCompany () { return this.customerForm.get('invoiceToCompany'); }
    get companyName () { return this.customerForm.get('company.companyName'); }
    get companyId () { return this.customerForm.get('company.companyId'); }
    get companyVat () { return this.customerForm.get('company.companyVat'); }
    get transportToSameAddress () { return this.customerForm.get('company.transportToSameAddress'); }

    get companyCountry () { return this.customerForm.get('company.address.country'); }
    get companyPostalCode () { return this.customerForm.get('company.address.postalCode'); }
    get companyCity () { return this.customerForm.get('company.address.city'); }
    get companyStreet () { return this.customerForm.get('company.address.street'); }
    get companyHouseNumber () { return this.customerForm.get('company.address.houseNumber'); }

    get companyPhone () { return this.customerForm.get('company.contact.phone'); }
    get companyEmail () { return this.customerForm.get('company.contact.email'); }

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _customerStorage: CustomerStorageService
        ) {
        this.customerForm = this._formBuilder.group({
            personal: this._formBuilder.group({
                firstname: [_customerStorage.customerInStorage?.personal?.firstname, Validators.required],
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
                })
            }),
            invoiceToCompany: [false],
            company: this._formBuilder.group({
                companyName: [null],
                companyId: [null],
                companyVat: [null],
                transportToSameAddress: [false],
                address: this._formBuilder.group({
                    country: ['Česká Republika'],
                    postalCode: [null],
                    city: [null],
                    street: [null],
                    houseNumber: [null],
                })
            })
        });
    }

    ngOnInit() {
        this.customerForm.valueChanges.subscribe(x => {
            if (x.invoiceToCompany) {
                this.companyName.setValidators(Validators.required);
                this.companyId.setValidators(Validators.required);
                this.companyVat.setValidators(Validators.required);

                if (x.company.transportToSameAddress) {
                    this.companyCountry.setValidators(Validators.required);
                    this.companyPostalCode.setValidators(Validators.required);
                    this.companyCity.setValidators(Validators.required);
                    this.companyStreet.setValidators(Validators.required);
                    this.companyHouseNumber.setValidators(Validators.required);
                } else {
                    this.customerForm.get('company.address').clearValidators();
                }
            } else {
                this.customerForm.controls.company.clearValidators();
            }
        });
    }

    public onNext () {
        const formValues = this.customerForm.value;
        const customer: ICustomerStorage = {
            personal: {
                firstname: formValues.personal.firstname,
                lastname: formValues.personal.lastname,
                address: {
                    country: formValues.personal.address.conutry,
                    postalCode: formValues.personal.address.postalCode,
                    city: formValues.personal.address.city,
                    street: formValues.personal.address.street,
                    houseNumber: formValues.personal.address.houseNumber,
                },
                contact: {
                    phone: formValues.personal.address.phone,
                    email: formValues.personal.address.email,
                }
            },
            company: {
                companyName: formValues.company.companyName,
                companyId: formValues.company.companyId,
                companyVat: formValues.company.companyVat,
                address: {
                    country: formValues.company.address.conutry,
                    postalCode: formValues.company.address.postalCode,
                    city: formValues.company.address.city,
                    street: formValues.company.address.street,
                    houseNumber: formValues.company.address.houseNumber,
                },
            }
        };
        this._customerStorage.set(customer);
        this._router.navigateByUrl(`${orderRoute}/${orderSummaryRoute}`);
    }
}
