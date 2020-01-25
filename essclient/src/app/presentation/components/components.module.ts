import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavModule, NavbarModule, WavesModule, AccordionModule, IconsModule, CardsModule, BadgeModule, ButtonsModule } from 'ng-uikit-pro-standard';
import { RouterModule } from '@angular/router';

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
    ButtonsModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ComponentsModule { }
