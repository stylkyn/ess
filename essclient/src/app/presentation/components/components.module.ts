import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavModule, NavbarModule, WavesModule, AccordionModule, IconsModule, CardsModule, BadgeModule, ButtonsModule, ModalModule } from 'ng-uikit-pro-standard';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  imports: [
  CommonModule,
    RouterModule,
    // plugins
    SidenavModule,
    NavbarModule,
    WavesModule,
    AccordionModule,
    WavesModule,
    SidenavModule,
    AccordionModule,
    IconsModule,
    NavbarModule,
    IconsModule,
    CardsModule,
    BadgeModule,
    ButtonsModule,
    ModalModule,
    NgxDaterangepickerMd.forRoot()
  ],
  declarations: [
    ShoppingCartComponent,
    DateRangeComponent,
  ],
  exports: [
    ShoppingCartComponent,
    DateRangeComponent
  ]
})
export class ComponentsModule { }
