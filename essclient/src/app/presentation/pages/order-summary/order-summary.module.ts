import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBSpinningPreloader, WavesModule, AccordionModule, 
    NavbarModule, CardsModule, ButtonsModule, 
    TabsModule, IconsModule, InputUtilitiesModule, StickyContentModule } from 'ng-uikit-pro-standard';
import { ComponentsModule } from '../../components/components.module';
import { routing } from './order-summary.routing';
import { RouterModule } from '@angular/router';
import { OrderSummaryComponent } from './order-summary.component';

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
    InputUtilitiesModule,
    ButtonsModule,
    TabsModule,
    IconsModule,
    StickyContentModule,

    ComponentsModule
  ],
  declarations: [
      OrderSummaryComponent
  ],
  exports: [
    RouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
      MDBSpinningPreloader,
    ]
})
export class OrderSummaryModule { }
