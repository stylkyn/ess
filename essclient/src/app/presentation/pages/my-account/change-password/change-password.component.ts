import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserChangePasswordRequest, UserService } from 'src/app/services/API/user.service';
import { MyToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-change-password-info',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    
    public changePasswordForm: FormGroup;
    isLoading = false;

    get password () { return this.changePasswordForm?.get('password'); }
    get passwordConfirm () { return this.changePasswordForm?.get('passwordConfirm'); }

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _toastService: MyToastService,
        private _userSrv: UserService) { 
        this.changePasswordForm = this._formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
        }, {
            validator: (group: any) => {
                if (group.value.passwordConfirm === group.value.password 
                    && group.value.password.length >= 6) {
                    group.controls.passwordConfirm.setErrors(null);
                    return null;
                }
                group.controls.passwordConfirm.setErrors({invalidPasswordConfirm: true});

                if (group.value.password.length < 6)
                    group.controls.password.setErrors({invalidPassword: true});
                else group.controls.password.setErrors(null);

                return {invalidPassword: true, invalidPasswordConfirm: true};
            }
        });
    }

    ngOnInit() {
       
    }

    confirmPasswordReset() {
        this.isLoading = true;
        const request: IUserChangePasswordRequest = {
            password: this.password.value,
        };
        this._userSrv.changePassword(request).subscribe(
            _ => {
                this._toastService.showSuccess('Heslo bylo úspěšně změněno');
                this.isLoading = false;
            }, e => {
            this._toastService.showError('Nepodařilo se změni vaše heslo');
            this.isLoading = false;
        });
    }

}
