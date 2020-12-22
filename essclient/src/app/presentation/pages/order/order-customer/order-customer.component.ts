import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerStorageService, ICustomerStorage } from 'src/app/services/storage/customer.service';
import { clearValidators } from 'src/app/utils/formUtils';
import { OrderBussinessService } from './../order.service';
import { IOrder } from './../../../../models/IOrder';
import { presentationGdprRoute, presentationOrderRoute } from 'src/app/presentation/theme/presentation-routes';
import { UserService } from './../../../../services/API/user.service';
import { orderFinishRoute } from './../order.routing';
import { getCountriesOptions } from 'src/app/models/ICounter';
import { presentationTermsRoute } from './../../../theme/presentation-routes';
import { email } from '@ng-validators/ng-validators';
@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.scss']
})
export class OrderCustomerComponent implements OnInit {
    customerForm: FormGroup;

    presentationTermsRoute = presentationTermsRoute;
    presentationGdprRoute = presentationGdprRoute;

    public countriesOptions = getCountriesOptions();
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

    get termsAndConditions () { return this.customerForm.get('termsAndConditions'); }
    get gpdrTerms () { return this.customerForm.get('gpdrTerms'); }

    get loggedUser () { return this._userService.user; }

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _customerStorage: CustomerStorageService,
        private _orderBussiness: OrderBussinessService,
        private _userService: UserService,
        ) {
        this.customerForm = this._formBuilder.group({
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
                    phone: [420, [Validators.required, Validators.minLength(4)]],
                    email: [null, [Validators.required, email]],
                }),
            }),
            invoiceToCompany: [false],
            company: this._formBuilder.group({
                companyName: [null],
                companyId: [null],
                companyVat: ['CZ'],
                transportToSameAddress: [false],
                address: this._formBuilder.group({
                    country: ['Česká Republika'],
                    postalCode: [null],
                    city: [null],
                    street: [null],
                    houseNumber: [null],
                })
            }),
            termsAndConditions: [false, Validators.requiredTrue],
            gpdrTerms: [false, Validators.requiredTrue]
        });
        this.invoiceToCompany.valueChanges.subscribe(value => {
            if (value) {
                this.companyName.setValidators(Validators.required);
                this.companyId.setValidators([Validators.required, Validators.minLength(8)]);
                this.companyVat.setValidators([Validators.required, Validators.minLength(10)]);
            } else {
                this.companyName.setValidators(null);
                this.companyId.setValidators(null);
                this.companyVat.setValidators(null);
            }
        });
        this.transportToSameAddress.valueChanges.subscribe(value => {
            if (!value) {
                this.companyCountry.setValidators(Validators.required);
                this.companyPostalCode.setValidators([Validators.required, Validators.minLength(5)]);
                this.companyCity.setValidators(Validators.required);
                this.companyStreet.setValidators(Validators.required);
                this.houseNumber.setValidators(Validators.required);
            } else {
                this.companyCountry.setValidators(null);
                this.companyPostalCode.setValidators(null);
                this.companyCity.setValidators(null);
                this.companyStreet.setValidators(null);
                this.houseNumber.setValidators(null);
            }
        });
    }

    ngOnInit() {
        this.customerForm.valueChanges.subscribe(x => 
            this.saveCustomerData());
        this.invoiceToCompany.valueChanges.subscribe(invoiceToCompany => 
            this.setCompanyValidator(invoiceToCompany));
        this.transportToSameAddress.valueChanges.subscribe(transportToSameAddress => 
            this.setCompanyAddressValidator(transportToSameAddress));

        this.setCompanyValidator(this._customerStorage.customerInStorage?.invoiceToCompany);
    }

    /**
     * Confirm order (save to api) (then) redirect to order detail
     */
    public async onConfirm () {
        this.saveCustomerData(); // save to localstorage
        const order: IOrder = await this._orderBussiness.setOrder();
        // this._router.navigate([`${presentationOrderSummaryRoute}`, order.id]);
        
        this._router.navigateByUrl(`${presentationOrderRoute}/${orderFinishRoute}`);
    }

    private setCompanyValidator(validate: boolean) {
        if (validate) {
            this.companyName.setValidators(Validators.required);
            this.companyId.setValidators(Validators.required);
            this.companyVat.setValidators(Validators.required);
        } else {
            clearValidators(this.companyName);
            clearValidators(this.companyId);
            clearValidators(this.companyVat);
        }
        this.setCompanyAddressValidator(validate);
    }

    private setCompanyAddressValidator(validate: boolean) {
        if (validate) {
            this.companyCountry.setValidators(Validators.required);
            this.companyPostalCode.setValidators(Validators.required);
            this.companyCity.setValidators(Validators.required);
            this.companyStreet.setValidators(Validators.required);
            this.companyHouseNumber.setValidators(Validators.required);
        } else {
            clearValidators(this.companyCountry);
            clearValidators(this.companyPostalCode);
            clearValidators(this.companyCity);
            clearValidators(this.companyStreet);
            clearValidators(this.companyHouseNumber);
        }
    }

    private saveCustomerData() {
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
                    phone: formValues.personal.contact.phone,
                    email: formValues.personal.contact.email,
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
            },
            invoiceToCompany: formValues.invoiceToCompany,
            transportToSameAddress: formValues.company.transportToSameAddress,
        };
        this._customerStorage.set(customer);
    }
}
