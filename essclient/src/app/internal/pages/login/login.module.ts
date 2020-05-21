import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './login.routing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginCardComponent } from './login-card/login-card.component';
import { InputsModule, InputUtilitiesModule, WavesModule, ButtonsModule } from 'ng-uikit-pro-standard';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        routing,
        FormsModule,
        InputsModule,
        InputUtilitiesModule,
        WavesModule,
        ButtonsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        LoginCardComponent
    ],
    exports: [
        RouterModule
    ],
})
export class LoginModule { }
