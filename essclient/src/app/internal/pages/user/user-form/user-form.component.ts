import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { email } from '@ng-validators/ng-validators';
import { getCountriesOptions } from 'src/app/models/ICounter';
import { IUser } from 'src/app/models/IUser';
import { IUserUpdateRequest } from 'src/app/services/API/user.service';
import { UserService } from './../../../../services/API/user.service';

type Type = 'update' | 'add';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
    @Output() changeData = new EventEmitter<IUser>();

    countriesOptions = getCountriesOptions();
    
    activeUser: IUser;
    userForm: FormGroup;
    visible = false;
    isLoading = false;

    get formType (): Type {
        return this.activeUser ? 'update' : 'add';
    }

    // personal
    get personal () { return this.userForm.get('personal'); }
    get firstname () { return this.userForm.get('personal.firstname'); }
    get lastname () { return this.userForm.get('personal.lastname'); }

    get country () { return this.userForm.get('personal.address.country'); }
    get postalCode () { return this.userForm.get('personal.address.postalCode'); }
    get city () { return this.userForm.get('personal.address.city'); }
    get street () { return this.userForm.get('personal.address.street'); }
    get houseNumber () { return this.userForm.get('personal.address.houseNumber'); }

    get phone () { return this.userForm.get('personal.contact.phone'); }
    get email () { return this.userForm.get('personal.contact.email'); }

    get password () { return this.userForm?.get('personal.password'); }
    get passwordConfirm () { return this.userForm?.get('personal.passwordConfirm'); }

    // company
    get company () { return this.userForm.get('company'); }
    get companyName () { return this.userForm.get('company.companyName'); }
    get companyId () { return this.userForm.get('company.companyId'); }
    get companyVat () { return this.userForm.get('company.companyVat'); }

    get companyCountry () { return this.userForm.get('company.address.country'); }
    get companyPostalCode () { return this.userForm.get('company.address.postalCode'); }
    get companyCity () { return this.userForm.get('company.address.city'); }
    get companyStreet () { return this.userForm.get('company.address.street'); }
    get companyHouseNumber () { return this.userForm.get('company.address.houseNumber'); }

    constructor (
        private _formBuilder: FormBuilder,
        private _userService: UserService,
    ) { 
        this.userForm = this._formBuilder.group({
            personal: this._formBuilder.group({
                firstname: [null, Validators.required],
                lastname: [null, Validators.required],
                address: this._formBuilder.group({
                    street: [null, Validators.required],
                    country: ['Česká Republika', Validators.required],
                    postalCode: [null, [Validators.required, Validators.minLength(5)]],
                    city: [null, Validators.required],
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
        });
    }

    // drawer actions
    open(user: IUser = null): void {
        this.reset();
        this.visible = true;

        if (user) {
            this.userForm.patchValue(user);
            this.email.setValue(user.email);
            this.activeUser = user;
        }
    }

    close(): void {
        this.visible = false;
        this.activeUser = null;
    }

    confirm(): void {
        this.update();
    }

    private reset() {
        this.userForm.reset();
    }

    private update(): void {
        this.isLoading = true;
        const request: IUserUpdateRequest = {
            id: this.activeUser?.id,
            personal: this.personal.value,
            company: this.company.value, 
        };

        this._userService.update(request).subscribe((user: IUser) => {
            this.changeData.next(user);
            this.reset();
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }
}
