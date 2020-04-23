import { IUser } from '../../../../models/IUser';
import { Subscription } from 'rxjs';
import { SocialLoginService } from './../../../../services/social-login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, ILoginRequest } from 'src/app/services/API/user.service';
import { adminDashFullRoute } from './../../../theme/admin-routes';

@Component({
    selector: 'app-login-card',
    templateUrl: './login-card.component.html',
    styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {
    // FORMS
    loginForm: FormGroup;
    // VISIBILITY
    badLoginMessage = false; // zobrazeni zpravy o spatnem prihlaseni

    subs: Subscription;

    public get _lg() {
        return this.loginForm.controls;
    }

    constructor (
        public _fb: FormBuilder,
        public _socialLogin: SocialLoginService,
        public _router: Router,
        private _userSrv: UserService,
        private _socialLoginSrv: SocialLoginService,
        private _el: ElementRef,
        private _renderer2: Renderer2,
    ) {
        // Login form
        this.loginForm = _fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.loginForm.valueChanges.subscribe(values => this.resetLoginValid());
    }

    public login() {
        const login: ILoginRequest = {
            email: this._lg.email.value,
            password: this._lg.password.value
        };
        return this._userSrv.verifyLoginAdmin(login).subscribe((user: IUser) => {
            if (user)
                this._router.navigateByUrl(adminDashFullRoute);
            else
                this.setBadLoginValid();
        }, (e) => this.setBadLoginValid());
    }

    private setBadLoginValid(): void {
        this.badLoginMessage = true;
        const success = this._el.nativeElement.querySelectorAll('.counter-success');
        success.forEach((element: Element) => {
            this._renderer2.removeClass(element, 'counter-success');
            this._renderer2.addClass(element, 'invalid');
        });
    }

    private resetLoginValid(): void {
        this.badLoginMessage = false;
        const success = this._el.nativeElement.querySelectorAll('.invalid');
        success.forEach((element: Element) => {
            this._renderer2.removeClass(element, 'invalid');
        });
    }
}
