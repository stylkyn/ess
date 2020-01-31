import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavModule, NavbarModule, WavesModule, AccordionModule, IconsModule, CardsModule, BadgeModule, ButtonsModule, ModalModule } from 'ng-uikit-pro-standard';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './Shopping-cart/Shopping-cart.component';

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
    ModalModule
  ],
  declarations: [
    ShoppingCartComponent
  ],
  exports: [
    ShoppingCartComponent
  ]
})
export class ComponentsModule { }
