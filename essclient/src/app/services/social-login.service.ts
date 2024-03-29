import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ISocialUser } from '../models/ISocialUser';

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {

  private _fb: ISocialUser;
  private _google: ISocialUser;

  /**
   * GETTERS
   */
  // vraci fb_Id pokud se prez nej uzivatel prihlasil/registroval
  public get fb(): ISocialUser {
    return this._fb;
  }
  // vraci google_Id pokud se prez nej uzivatel prihlasil/registroval
  public get google(): ISocialUser {
    return this._google;
  }

  constructor(private _router: Router ) {}

  public async socialSignIn(socialPlatform: string): Promise<any> {
      return null;
    // let socialPlatformProvider;
    // if (socialPlatform === 'facebook') {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialPlatform === 'google') {
    //   socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    // }
    // const promise = await this.socialAuthService.signIn(socialPlatformProvider).then(
    //   (socialData: ISocialUser) => {
    //     console.log(socialPlatform + ' sign in data : ', socialData);
    //     if (socialPlatform === 'facebook') {
    //       this._fb = socialData;
    //     } else if (socialPlatform === 'google') {
    //       this._google = socialData;
    //     }
    // });
    // return promise;
  }
}
