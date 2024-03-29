import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, ILoginRequest } from 'src/app/services/API/user.service';
import { Subscription } from 'rxjs';
import { email } from '@ng-validators/ng-validators';

@Component({
  selector: 'app-login-modal-content',
  templateUrl: './login-modal-content.component.html',
  styleUrls: ['./login-modal-content.component.scss']
})
export class LoginModalContentComponent implements OnInit{
    @Output() showRegister: EventEmitter<any> = new EventEmitter();
    @Output() showResetPassword: EventEmitter<any> = new EventEmitter();
    
    public busyForm: Subscription;
    public loginForm: FormGroup;
    public isBadAccess = false;

    public get emailForm () {
        return this.loginForm.get('email');
    }
    public get passwordForm () {
        return this.loginForm.get('password');
    }

    constructor(
        public _modalRef: MDBModalRef,
        private _formBuilder: FormBuilder,
        private _userSrv: UserService) {
    }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, email]],
            password: ['', Validators.required]
        });
        this.loginForm.valueChanges.subscribe(x => {
            if (this.isBadAccess) {
                this.isBadAccess = false;
            }
        });
    }


    confirmLogin() {
        const request: ILoginRequest = {
            email: this.emailForm.value,
            password: this.passwordForm.value
        };
        this.busyForm = this._userSrv.verifyLogin(request).subscribe(
            user => {
                this._modalRef.hide();
            },
            (e) => this.isBadAccess = true);
    }

    showRegisterModal() {
        this._modalRef.hide();
        this.showRegister.next(true);
    }

    showResetPasswordModal() {
        this._modalRef.hide();
        this.showResetPassword.next(true);
    }

}
