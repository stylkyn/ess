import { AppRoutingModule } from './app-routes.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider
} from 'angular-6-social-login';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from 'ng-gapi';

// settings for google API, scopes(permisions) for google contacts
const gapiClientConfig: NgGapiClientConfig = {
  client_id: '1072250394796-somktok6db47oefdrajvhs1blsthumtm.apps.googleusercontent.com',
  discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
  scope: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    'https://www.google.com/m8/feeds/',
    'profile',
    'email',
    'https://www.googleapis.com/auth/contacts.readonly'
  ].join(' '),
  cookie_policy: 'single_host_origin',
};

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('345889055883129')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('1072250394796-somktok6db47oefdrajvhs1blsthumtm.apps.googleusercontent.com')
      // 8cc20GZp7cTCskOcPsff5G2E
      },
      // {
      //   id: LinkedinLoginProvider.PROVIDER_ID,
      //   provider: new LinkedinLoginProvider('77gzlf10s0xabl')
      // },
    ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    // PLUGINY
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({ // pripojeni ke google mapam
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    SocialLoginModule, // module pro prihlaseni FB,GOOGLE,LinkEdin
    GoogleApiModule.forRoot({ // google API
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    // vlastni modely
    AppRoutingModule // vlastni model routovani
  ],
  providers: [
    MDBSpinningPreloader,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
