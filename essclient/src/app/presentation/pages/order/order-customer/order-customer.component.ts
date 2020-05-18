import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerStorageService, ICustomerStorage } from 'src/app/services/storage/customer.service';
import { clearValidators } from 'src/app/utils/formUtils';
import { OrderBussinessService } from './../order.service';
import { IOrder } from './../../../../models/IOrder';
import { presentationOrderSummaryRoute } from 'src/app/presentation/theme/presentation-routes';
import { UserService, ILoginRequest } from './../../../../services/API/user.service';

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

    get password () { return this.customerForm?.get('personal.password'); }
    get passwordConfirm () { return this.customerForm?.get('personal.passwordConfirm'); }


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

    get termsAndConditions () { return this.customerForm.get('termsAndConditions'); }
    get gpdrTerms () { return this.customerForm.get('gpdrTerms'); }

    get loggedUser () { return this._userService.user; }

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _customerStorage: CustomerStorageService,
        private _orderBussiness: OrderBussinessService,
        private _userService: UserService
        ) {
        this.customerForm = this._formBuilder.group({
            personal: this._formBuilder.group({
                firstname: [_customerStorage.customerInStorage?.personal?.firstname, Validators.required],
                lastname: [_customerStorage.customerInStorage?.personal?.lastname, Validators.required],
                address: this._formBuilder.group({
                    country: [_customerStorage.customerInStorage?.personal?.address?.country ?? 'Česká Republika', Validators.required],
                    postalCode: [_customerStorage.customerInStorage?.personal?.address?.postalCode, Validators.required],
                    city: [_customerStorage.customerInStorage?.personal?.address?.city, Validators.required],
                    street: [_customerStorage.customerInStorage?.personal?.address?.street, Validators.required],
                    houseNumber: [_customerStorage.customerInStorage?.personal?.address?.houseNumber, Validators.required],
                }),
                contact: this._formBuilder.group({
                    phone: [_customerStorage.customerInStorage?.personal?.contact?.phone, Validators.required],
                    email: [_customerStorage.customerInStorage?.personal?.contact?.email, Validators.required],
                }),
                password: ['', [Validators.required, Validators.minLength(6)]],
                passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
            }),
            invoiceToCompany: [_customerStorage.customerInStorage?.invoiceToCompany ?? false],
            company: this._formBuilder.group({
                companyName: [_customerStorage.customerInStorage?.company?.companyName],
                companyId: [_customerStorage.customerInStorage?.company?.companyId],
                companyVat: [_customerStorage.customerInStorage?.company?.companyVat],
                transportToSameAddress: [_customerStorage.customerInStorage?.transportToSameAddress ?? false],
                address: this._formBuilder.group({
                    country: [_customerStorage.customerInStorage?.company?.address?.country ?? 'Česká Republika'],
                    postalCode: [_customerStorage.customerInStorage?.company?.address?.postalCode],
                    city: [_customerStorage.customerInStorage?.company?.address?.city],
                    street: [_customerStorage.customerInStorage?.company?.address?.street],
                    houseNumber: [_customerStorage.customerInStorage?.company?.address?.houseNumber],
                })
            }),
            termsAndConditions: [false, Validators.requiredTrue],
            gpdrTerms: [false, Validators.requiredTrue]
        }, {
            validator: (group: any) => {
                if (!this.loggedUser) {
                    if (group.value.personal.passwordConfirm === group.value.personal.password 
                            && group.value.personal.password && group.value.personal.password.length >= 6) {
                        group.controls.personal.controls.passwordConfirm.setErrors(null);
                        return null;
                    }
                    group.controls.personal.controls.passwordConfirm.setErrors({invalidPasswordConfirm: true});

                    if (group.value.personal.password.length < 6)
                        group.controls.personal.controls.password.setErrors({invalidPassword: true});
                    else group.controls.personal.controls.password.setErrors(null);

                    return {invalidPassword: true, invalidPasswordConfirm: true};
                }
                return null;
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

        this.setPasswordValidator(this._userService.user ? false : true);
        this._userService.onUserChange.subscribe(user => {
            this.setPasswordValidator(user ? false : true);
        });
    }

    /**
     * Confirm order (save to api) (then) redirect to order detail
     */
    public async onConfirm () {
        this.saveCustomerData(); // save to localstorage
        const order: IOrder = await this._orderBussiness.setOrder();

        if(!this.loggedUser)
            await this.login();

        this._router.navigate([`${presentationOrderSummaryRoute}`, order.id]);
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

    private setPasswordValidator(validate: boolean) {
        if (validate) {
            this.password.setValidators([Validators.required, Validators.minLength(6)]);
            this.passwordConfirm.setValidators([Validators.required, Validators.minLength(6)]);
        } else {
            clearValidators(this.password);
            clearValidators(this.passwordConfirm);
        }
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
                password: formValues.personal.password,
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

    private async login() {
        const request: ILoginRequest = {
            email: this.email.value,
            password: this.password.value
        };
        await this._userService.verifyLogin(request).toPromise();
    }
}
