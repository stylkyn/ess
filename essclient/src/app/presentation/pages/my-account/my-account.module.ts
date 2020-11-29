import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { RouterModule } from '@angular/router';
import { routing } from './my-account.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ButtonsModule, WavesModule, IconsModule, CardsModule, InputsModule, InputUtilitiesModule, SelectModule, StickyContentModule, AccordionModule, CheckboxModule, NavbarModule, TabsModule } from 'ng-uikit-pro-standard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
    imports: [
    CommonModule,
        // plugins
        CardsModule,
        WavesModule,
        AccordionModule,
        NavbarModule,
        RouterModule,
        NzDividerModule,
        NzTableModule,
        NzSpinModule,
        // routing
        routing,
        FormsModule,
        ReactiveFormsModule,
        // plugins
        WavesModule,
        InputsModule,
        InputUtilitiesModule,
        ButtonsModule,
        CheckboxModule,
        SelectModule,
        TabsModule,
        IconsModule,
        StickyContentModule,
        // my modules
        ComponentsModule
    ],
    declarations: [
        MyAccountComponent,
        UserProfileComponent,
        MyOrderComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAccountModule { }
