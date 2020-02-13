import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavModule, NavbarModule, WavesModule, AccordionModule, IconsModule, CardsModule, BadgeModule, ButtonsModule, ModalModule } from 'ng-uikit-pro-standard';
import { RouterModule } from '@angular/router';
import { DateRangeComponent } from './date-range/date-range.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ShoppingCardModalComponent } from './shopping-card-modal/shopping-card-modal.component';
import { ShoppingCardModalContentComponent } from './shopping-card-modal/shopping-card-modal-content.component';

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
    ModalModule.forRoot(),
    NgxDaterangepickerMd.forRoot()
  ],
  declarations: [
    ShoppingCardModalComponent,
    ShoppingCardModalContentComponent,
    DateRangeComponent,
  ],
  entryComponents: [ ShoppingCardModalContentComponent ],
  exports: [
    DateRangeComponent,
    ShoppingCardModalComponent,
  ]
})
export class ComponentsModule { }
