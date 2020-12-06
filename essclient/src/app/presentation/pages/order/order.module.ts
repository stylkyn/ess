import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBSpinningPreloader, WavesModule, AccordionModule, 
    InputsModule, NavbarModule, CardsModule, ButtonsModule, 
    SelectModule, TabsModule, IconsModule, InputUtilitiesModule, CheckboxModule, StickyContentModule } from 'ng-uikit-pro-standard';
import { ComponentsModule } from '../../components/components.module';
import { routing } from './order.routing';
import { RouterModule } from '@angular/router';
import { OrderProductsComponent } from './order-products/order-products.component';
import { OrderComponent } from './order.component';
import { OrderTransportComponent } from './order-transport/order-transport.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { OrderCustomerComponent } from './order-customer/order-customer.component';
import { OrderBussinessService } from './order.service';
import { OrderFinishComponent } from './order-finish/order-finish.component';

@NgModule({
  imports: [
    CommonModule,
    // plugins
    CardsModule,
    WavesModule,
    AccordionModule,
    NavbarModule,
    // my modules
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

    ComponentsModule
  ],
  declarations: [
      OrderComponent,
      OrderProductsComponent,
      OrderTransportComponent,
      OrderPaymentComponent,
      OrderCustomerComponent,
      OrderFinishComponent,
  ],
  exports: [
    RouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
      OrderBussinessService
    ]
})
export class OrderModule { }
