import { AuthService } from './../../../../services/auth.service';
import { ISocialUser } from 'src/app/models/ISocialUser';
import { UserService } from './../../../../services/API/user.service';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IUser } from 'src/app/models/IUser';
import { Observable } from 'rxjs';
import { SocialLoginService } from 'src/app/services/social-login.service';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss']
})
export class RegisterCardComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userSrv: UserService,
    private _socialLoginSrv: SocialLoginService,
    private _el: ElementRef,
    private _renderer2: Renderer2,
    private _auth: AuthService
    ) {
      this.registerForm = this._fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', [Validators.required, Validators.required]],
        email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.setFormFromSocial();
  }
  /**
   * GETTERS
  */
  // shortcut for registerForm controls
  public get rf () {
    return this.registerForm.controls;
  }
  // overi jestli se jedna o registraci pres socialni site
  public get isSocial() {
    return (this._socialLoginSrv.google || this._socialLoginSrv.fb);
  }

 /**
  * PUBLIC METHOD - Used in HTML ----------------------------------
  */
  // Navigate to login
  public goLogin() {
    this._router.navigateByUrl('administration/login');
  }
  // register user
  public register() {
    this.doRegister().subscribe((user: IUser) => {
      this._auth.setUser(user);
      this._router.navigateByUrl('administration/dash');
  });
  }
 /**
  * INTERNAL METHOD -----------------------------------------------
  */
  // nastavi data do registracniho formulare dle fb/google uctu
  private setFormFromSocial() {
    let socialUser: ISocialUser;
    if (this._socialLoginSrv.fb) {
      socialUser = this._socialLoginSrv.fb;
    } else if (this._socialLoginSrv.google) {
      socialUser = this._socialLoginSrv.google;
    }
    if (socialUser) {
      this.registerForm.patchValue({
        email: socialUser.email,
        firstName: socialUser.name.split(' ')[0],
        lastName: socialUser.name.split(' ')[1]
      });
      this.setValidation();
      this.rf.email.markAsDirty();
      this.rf.firstName.markAsDirty();
      this.rf.lastName.markAsDirty();
    }
  }
  private setValidation() {
    const success = this._el.nativeElement.querySelectorAll('.counter-success');
    const danger = this._el.nativeElement.querySelectorAll('.counter-danger');
    const textSuccess = this._el.nativeElement.querySelectorAll('.text-success');
    const textDanger = this._el.nativeElement.querySelectorAll('.text-danger');
    success.forEach((element: any) => {
        this._renderer2.addClass(element, 'counter-success');
    });
    danger.forEach((element: any) => {
        this._renderer2.addClass(element, 'counter-danger');
    });
    textSuccess.forEach((element: any) => {
        this._renderer2.setStyle(element, 'visibility', 'visible');
    });
    textDanger.forEach((element: any) => {
        this._renderer2.setStyle(element, 'visibility', 'visible');
    });
}
 /** SET API **/
 // Register user on API and return subscription
  private doRegister(): Observable<any> {
    const newUser: any = {
      username: this.rf.username.value,
      firstName: this.rf.firstName.value,
      lastName: this.rf.lastName.value,
      email: this.rf.email.value,
      password: this.rf.password.value,
      role_Id: 3, // uzivatel
      fb_Id: (this._socialLoginSrv.fb ? this._socialLoginSrv.fb.id : null),
      google_Id: (this._socialLoginSrv.google ? this._socialLoginSrv.google.id : null),
    };
    return this._userSrv.add(newUser);
  }
}
