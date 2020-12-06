import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SidenavModule, NavbarModule, WavesModule, AccordionModule, InputsModule, SelectModule,
    IconsModule, CardsModule, BadgeModule, ButtonsModule, ModalModule, CheckboxModule, InputUtilitiesModule, DropdownModule
} from 'ng-uikit-pro-standard';
import { RouterModule } from '@angular/router';
import { DateRangeComponent } from './date-range/date-range.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ShoppingCardModalComponent } from './shopping-card-modal/shopping-card-modal.component';
import { ShoppingCardModalContentComponent } from './shopping-card-modal/shopping-card-modal-content.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { LoginModalContentComponent } from './login-modal/login-modal-content.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgBusyModule } from 'ng-busy';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { RegisterModalContentComponent } from './register-modal/register-modal-content.component';
import { ShoppingButtonComponent } from './shopping-button/shopping-button.component';
import { ShoppingCardProductsComponent } from './shopping-card-products/shopping-card-products.component';
import { OrderSummaryCardComponent } from './order-summary-card/order-summary-card.component';
import { ServiceDateContentComponent } from './service-date/service-date-content.component';
import { ServiceDateComponent } from './service-date/service-date.component';
import { ResetPasswordModalContentComponent } from './reset-password-modal/reset-password-modal-content.component';
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        // plugins
        SidenavModule,
        NavbarModule,
        WavesModule,
        AccordionModule,
        IconsModule,
        CardsModule,
        BadgeModule,
        ButtonsModule,
        CheckboxModule,
        InputsModule,
        SelectModule,
        InputUtilitiesModule,
        ReactiveFormsModule,
        FormsModule,
        NgBusyModule,
        ModalModule.forRoot(),
        NgxDaterangepickerMd.forRoot(),
    ],
    declarations: [
        ShoppingCardModalComponent,
        ShoppingCardModalContentComponent,
        DateRangeComponent,
        LoginModalComponent,
        LoginModalContentComponent,
        RegisterModalComponent,
        RegisterModalContentComponent,
        ShoppingButtonComponent,
        ShoppingCardProductsComponent,
        OrderSummaryCardComponent,
        ServiceDateContentComponent,
        ServiceDateComponent,
        ResetPasswordModalComponent,
        ResetPasswordModalContentComponent
    ],
    entryComponents: [
        ShoppingCardModalContentComponent,
        LoginModalContentComponent,
        RegisterModalContentComponent,
        ServiceDateContentComponent,
        ResetPasswordModalContentComponent,
    ],
    exports: [
        DateRangeComponent,
        ShoppingCardModalComponent,
        LoginModalComponent,
        RegisterModalComponent,
        ShoppingButtonComponent,
        ShoppingCardProductsComponent,
        OrderSummaryCardComponent,
        ServiceDateComponent,
        ResetPasswordModalComponent
    ]
})
export class ComponentsModule { }
