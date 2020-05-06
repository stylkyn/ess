import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { RouterModule } from '@angular/router';
import { routing } from './my-account.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ButtonsModule, WavesModule, IconsModule } from 'ng-uikit-pro-standard';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NzTableModule,
        NzDividerModule,
        ButtonsModule,
        WavesModule,
        IconsModule,
        routing
    ],
    declarations: [
        MyAccountComponent,
        MyOrderComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAccountModule { }
