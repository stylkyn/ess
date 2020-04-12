import { AppRoutingModule } from './app-routes.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgBusyModule } from 'ng-busy';
import {
  GoogleApiModule,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
} from 'ng-gapi';

// settings for google API, scopes(permisions) for google contacts
const gapiClientConfig: NgGapiClientConfig = {
  client_id: '1072250394796-somktok6db47oefdrajvhs1blsthumtm.apps.googleusercontent.com',
  discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
  scope: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.google.com/m8/feeds/',
    'profile',
    'email',
    'https://www.googleapis.com/auth/contacts.readonly'
  ].join(' '),
  cookie_policy: 'single_host_origin',
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgBusyModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({ // pripojeni ke google mapam
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    GoogleApiModule.forRoot({ // google API
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    // vlastni modely
    AppRoutingModule // vlastni model routovani
  ],
  providers: [
    MDBSpinningPreloader,
    CookieService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
