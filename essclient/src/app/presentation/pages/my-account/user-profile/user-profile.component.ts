import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/IUser';
import { IUserUpdateRequest, UserService } from 'src/app/services/API/user.service';
import { getCountriesOptions } from 'src/app/models/ICounter';
import { MyToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    
    countriesOptions = getCountriesOptions();

    userForm: FormGroup;
    isLoading = false;

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

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _toastService: MyToastService,
        ) { 
        this.userForm = this._formBuilder.group({
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
                    email: [null, Validators.required],
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

    ngOnInit() {
        const user = this._userService.user;
        if (user) {
            this.userForm.patchValue(user);
        } else {
            this._userService.onUserChange.subscribe((loadedUser: IUser) => {
                this.userForm.patchValue(loadedUser);
            });
        }
    }

    public update(): void {
        this.isLoading = true;
        const request: IUserUpdateRequest = {
            id: this._userService.user?.id,
            personal: this.personal.value,
            company: this.company.value, 
        };

        this._userService.update(request).subscribe((user: IUser) => {
            this._toastService.showSuccess('Údaje úspěšně uloženy');
            this.isLoading = false;
        }, (e) => {
            this.isLoading = false;
            this._toastService.showError('Nepodařilo se uložit Vaše údaje');

        });
    }

}
