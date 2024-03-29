import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MDBSpinningPreloader, SidenavModule, WavesModule, AccordionModule, CarouselModule,
    InputsModule, NavbarModule, CardsModule, BreadcrumbModule, ButtonsModule, SelectModule, LightBoxModule
} from 'ng-uikit-pro-standard';
import { ComponentsModule } from '../../components/components.module';
import { EshopComponent } from './eshop.component';
import { EshopDetailComponent } from './eshop-detail/eshop-detail.component';
import { EshopProductsComponent } from './eshop-products/eshop-products.component';
import { routing } from './eshop.routing';
import { RouterModule } from '@angular/router';
import { EshopMenuComponent } from './eshop-menu/eshop-menu.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
    imports: [
        CommonModule,
        // plugins
        SidenavModule,
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
        CarouselModule,
        WavesModule,
        InputsModule,
        BreadcrumbModule,
        ButtonsModule,
        SelectModule,
        LightBoxModule,
        NgxSkeletonLoaderModule,

        ComponentsModule
    ],
    declarations: [
        EshopComponent,
        EshopDetailComponent,
        EshopProductsComponent,
        EshopMenuComponent,
    ],
    exports: [
        RouterModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [MDBSpinningPreloader]
})
export class EshopModule { }
