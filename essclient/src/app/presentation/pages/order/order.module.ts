import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBSpinningPreloader, WavesModule, AccordionModule, CarouselModule, 
    InputsModule, NavbarModule, CardsModule, ButtonsModule, 
    SelectModule, TabsModule, IconsModule, InputUtilitiesModule, CheckboxModule } from 'ng-uikit-pro-standard';
import { ComponentsModule } from '../../components/components.module';
import { routing } from './order.routing';
import { RouterModule } from '@angular/router';
import { OrderProductsComponent } from './order-products/order-products.component';
import { OrderComponent } from './order.component';
import { OrderTransportComponent } from './order-transport/order-transport.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { OrderCustomerComponent } from './order-customer/order-customer.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

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

    ComponentsModule
  ],
  declarations: [
      OrderComponent,
      OrderProductsComponent,
      OrderTransportComponent,
      OrderPaymentComponent,
      OrderCustomerComponent,
      OrderSummaryComponent
  ],
  exports: [
    RouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [MDBSpinningPreloader]
})
export class OrderModule { }
