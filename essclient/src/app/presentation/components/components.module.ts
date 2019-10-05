import { ShopMenuComponent } from './shop-main/shop-menu/shop-menu.component';
import { ShopMainComponent } from './shop-main/shop-main.component';
import { ShopProductsComponent } from './shop-main/shop-products/shop-products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { SidenavModule, NavbarModule, WavesModule, AccordionModule } from 'ng-uikit-pro-standard'

@NgModule({
  imports: [
    CommonModule,
    // plugins
    SidenavModule,
    NavbarModule,
    WavesModule,
    AccordionModule
  ],
  declarations: [
    ComponentsComponent,
    ShopMenuComponent,
    ShopProductsComponent,
    ShopMainComponent
  ],
  exports: [
    ShopMainComponent
  ]
})
export class ComponentsModule { }
