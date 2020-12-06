import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, ILoginRequest, IUserResetPasswordRequest } from 'src/app/services/API/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password-modal-content',
  templateUrl: './reset-password-modal-content.component.html',
  styleUrls: ['./reset-password-modal-content.component.scss']
})
export class ResetPasswordModalContentComponent implements OnInit{
    public passwordResetForm: FormGroup;
    public busyForm: Subscription;
    isSended: boolean | undefined;

    public get email () {
        return this.passwordResetForm.get('email');
    }
    constructor(
        public _modalRef: MDBModalRef,
        private _formBuilder: FormBuilder,
        private _userSrv: UserService) {
    }

    ngOnInit(): void {
        this.passwordResetForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
        this.passwordResetForm.valueChanges.subscribe(x => {
            this.isSended = undefined;
        });
    }

    confirmPasswordReset() {
        const request: IUserResetPasswordRequest = {
            email: this.email.value,
        };
        this.busyForm = this._userSrv.resetPassword(request).subscribe(
            _ => {
                this.isSended = true;
        }, e => {
            this.isSended = false;
        });
    }
}
