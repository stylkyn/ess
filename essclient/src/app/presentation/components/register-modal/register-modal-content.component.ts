import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, ICreateUserRequest } from 'src/app/services/API/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-modal-content',
  templateUrl: './register-modal-content.component.html',
  styleUrls: ['./register-modal-content.component.scss']
})
export class RegisterModalContentComponent implements OnInit{
    public busyForm: Subscription;
    public registerForm: FormGroup;
    public isBadAccess = false;

    public get emailForm () {
        return this.registerForm.get('email');
    }
    public get passwordForm () {
        return this.registerForm.get('password');
    }
    public get passwordConfirmForm () {
        return this.registerForm.get('passwordConfirm');
    }
    public get termsForm () {
        return this.registerForm.get('terms');
    }

    constructor(
        public _modalRef: MDBModalRef,
        private _formBuilder: FormBuilder,
        private _userSrv: UserService) {
    }

    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
            terms: [false, Validators.pattern('true')]
        }, {
            validator: (group: FormGroup) => {
                if (group.value.passwordConfirm === group.value.password) {
                    group.controls.passwordConfirm.setErrors(null);
                    return null;
                }
                group.controls.passwordConfirm.setErrors({invalidPasswordConfirm: true});
                return {invalidPassword: true, invalidPasswordConfirm: true};
            }
        });
        this.registerForm.valueChanges.subscribe(x => {
            if (this.isBadAccess) {
                this.isBadAccess = false;
            }
        });
    }


    confirmRegister() {
        const request: ICreateUserRequest = {
            email: this.emailForm.value,
            password: this.passwordForm.value
        };
        this.busyForm = this._userSrv.create(request).subscribe(
            user => {
                this._modalRef.hide();
            },
            (e) => this.isBadAccess = true);
    }

}
