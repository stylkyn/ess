import { AuthService } from './../../../../services/auth.service';
import { ISocialLogin } from 'src/app/model/ISocialLogin';
import { IUser } from './../../../../model/IUser';
import { Observable, Subscription } from 'rxjs';
import { SocialLoginService } from './../../../../services/social-login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/API/user.service';
import { ILogin } from 'src/app/model/ILogin';
import { ISocialUser } from 'src/app/model/ISocialUser';

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

  public get _lg(){
    return this.loginForm.controls;
  }

  constructor(
    public _fb: FormBuilder,
    public _socialLogin: SocialLoginService,
    public _router: Router,
    private _userSrv: UserService,
    private _socialLoginSrv: SocialLoginService,
    private _el: ElementRef,
    private _renderer2: Renderer2,
    private _auth: AuthService
    ) {
      // Login form
      this.loginForm = _fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
  }

  ngOnInit() {
    this.onChangeForm();
  }

  /**
   * GETTERS
   */

  /**
   * PUBLIC METHOD - Used in HTML ----------------------------------
   */
  // prihlaseni pres formular
  public tryLogin() {
    this.doLogin().subscribe((user: IUser) => {
      console.log(user);
      if (user) {
        this.loggedSuccess(user);
      } else {
        this.setBadLoginValid();
      }
    }, (e) => this.setBadLoginValid());
  }
  // prihlaseni pres socialni site
  public trySocialLogin(platform: string) {
    this.doSocialLogin(platform).then((user: IUser) => {
      console.log(user);
      if (user) {
        this.loggedSuccess(user);
      } else {
        this.goRegister();
      }
    }, (e) => this.setBadLoginValid());
  }
  // Presmeruje na stranku s registraci
  public goRegister() {
    this._router.navigateByUrl('administration/login/register');
  }
  // Presmeruje na stranku s dashboardem
  public goDash() {
    this._router.navigateByUrl('administration/dash');
  }
  /**
   * INTERNAL METHOD -----------------------------------------------
   */
  /** INTERNAL */
  // provede prihlaseni uzivatele
  private loggedSuccess(user: IUser): void {
    this._auth.setUser(user);
    this.goDash();
  }
  // spatne prihlasovaci udaje - validace
  private setBadLoginValid(): void {
    this.badLoginMessage = true;
    const success = this._el.nativeElement.querySelectorAll('.counter-success');
    success.forEach((element: Element) => {
      this._renderer2.removeClass(element, 'counter-success');
      this._renderer2.addClass(element, 'invalid');
    });
  }
  // reset validace
  private resetLoginValid(): void {
    this.badLoginMessage = false;
    const success = this._el.nativeElement.querySelectorAll('.invalid');
    success.forEach((element: Element) => {
      this._renderer2.removeClass(element, 'invalid');
    });
  }
  /** EVENT HANDLERS */
  private onChangeForm(): void {
    this.loginForm.valueChanges.subscribe(values => this.resetLoginValid());
  }
  /** SET API **/
  // login user by form
  private doLogin(): Observable<IUser> {
    const login: ILogin = {
      username: this._lg.username.value,
      password: this._lg.password.value
    };
    return this._userSrv.verifyLogin(login);
  }
  // login user by social (fb/google)
  private doSocialLogin(platform: string): Promise<IUser> {
    return this._socialLogin.socialSignIn(platform).then((socialUser: ISocialUser) => {
      const socialLogin: ISocialLogin = {
        fb_Id: (this._socialLoginSrv.fb ? this._socialLoginSrv.fb.id : null),
        google_Id: (this._socialLoginSrv.google ? this._socialLoginSrv.google.id : null),
      };
      return this._userSrv.verifySocialLogin(socialLogin).toPromise();
    });
  }
}
