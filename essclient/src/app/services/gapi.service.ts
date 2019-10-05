import { SocialLoginService } from './social-login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { GoogleAuthService, GoogleApiService } from 'ng-gapi';
// import GoogleUser = gapi.auth2.GoogleUser;
// import GoogleAuth = gapi.auth2.GoogleAuth;

declare var gapi: any;

// GOOGLE API service

@Injectable({
  providedIn: 'root'
})
export class GapiService {
  auth2: any;

  private baseUrl = 'https://www.google.com/m8/feeds';

  constructor(
      private _http: HttpClient,
      private _googleAuthSrv: GoogleAuthService,
      private _googleApiSrv: GoogleApiService,
      private _socialLogin: SocialLoginService
      ) {
    // this._googleApiSrv.onLoad().subscribe(a => console.log('google api i sreaady'));
  }
  getKey() {
    console.log(gapi.auth2.getAuthInstance());
    console.log(gapi.auth2.getAuthInstance().signIn());
  }
  signIn() {
    gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
            client_id: '1072250394796-somktok6db47oefdrajvhs1blsthumtm.apps.googleusercontent.com',
            cookie_policy: 'single_host_origin',
            scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
        });
        this.auth2.attachClickHandler(document.getElementById('googleres'), {}, this.onSignIn, this.onFailure);
        console.log(this.auth2)
    });
  }
  onSignIn(){
    console.log('super');
  }
  onFailure() {
    console.log('spatny');
  }

  fetchmail() {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: 'key',
            discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
            clientId: '1072250394796-somktok6db47oefdrajvhs1blsthumtm.apps.googleusercontent.com',
            scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
        }).then(() => {
            return gapi.client.people.people.connections.list({
                resourceName: 'people/me',
                personFields: 'emailAddresses,names'
            });
        }).then(
            (res) => {
                //console.log("Res: " + JSON.stringify(res)); to debug
                console.log(res.result);
                // this.userContacts.emit(this.transformToMailListModel(res.result));
            },
            error => console.log("ERROR " + JSON.stringify(error))
        );
    });
  }
}









  // public postSOmething(): Promise<any> {
  //   console.log(this._socialLogin.google);
  //   return this._http.post(`${this.baseUrl}/contacts/${this._socialLogin.google.email}/full`, {}, {
  //     headers: new HttpHeaders({
  //           Authorization: `Bearer ${this._socialLogin.google.token}`
  //       })
  //   }).toPromise();
  // }

  // public getContacts(): Promise<any> {
  //   return this._http.get(
  //       `${this.baseUrl}/contacts/${this._socialLogin.google.email.replace('@', '%40')}/full?alt=json`,
  //       this.getOptions()
  //     ).toPromise();
  // }

  // private getOptions(): object {
  //   console.log(this._socialLogin.google.token);
  //   const headers = new HttpHeaders({ 'Accept': 'application/json'});
  //   headers.append('Access-Control-Allow-Origin', '*');
  //   headers.append('Access-Control-Allow-Headers', 'Content-Type');
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', `Bearer ${this._socialLogin.google.token}`);
  //   console.log(JSON.stringify({ headers: headers }));
  //   console.log({ headers: headers });
  //   return { headers: headers };
  // }
  // public logIn() {
  //   console.log('login');
  //   this._googleAuthSrv.getAuth().subscribe((auth) => {
  //     console.log(auth);
  //     auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
  //  });
  // }
  // private signInSuccessHandler(res: GoogleUser) {
  //   console.log(res);
  // }
  // private signInErrorHandler(err) {
  //     console.warn(err);
  // }
//  }
