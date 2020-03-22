import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavModule, NavbarModule, WavesModule, AccordionModule, InputsModule, SelectModule,
    IconsModule, CardsModule, BadgeModule, ButtonsModule, ModalModule, CheckboxModule, InputUtilitiesModule, DropdownModule } from 'ng-uikit-pro-standard';
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
        RegisterModalContentComponent
    ],
    entryComponents: [
        ShoppingCardModalContentComponent,
        LoginModalContentComponent,
        RegisterModalContentComponent
    ],
    exports: [
        DateRangeComponent,
        ShoppingCardModalComponent,
        LoginModalComponent,
        RegisterModalComponent
    ]
})
export class ComponentsModule { }
