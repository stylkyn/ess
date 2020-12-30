import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetaModule } from 'ng2-meta';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from './theme.component';
import { MDBSpinningPreloader, SidenavModule,
  WavesModule, AccordionModule, CarouselModule, InputsModule, NavbarModule, IconsModule, DropdownModule } from 'ng-uikit-pro-standard';
import { routing, metaConf } from './presentation.routing';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './../pages/homepage/homepage.component';
import { ComponentsModule } from './../components/components.module';
import { RouterModule } from '@angular/router';
import { FacebookModule } from 'ngx-facebook';

@NgModule({
  imports: [
    CommonModule,
    // plugins
    SidenavModule,
    WavesModule,
    AccordionModule,
    NavbarModule,
    // routing
    routing,
    FormsModule,
    ReactiveFormsModule,
    // plugins
    MetaModule.forRoot(metaConf),
    DropdownModule.forRoot(),
    CarouselModule,
    WavesModule,
    InputsModule,
    IconsModule,
    FacebookModule,

    ComponentsModule,
  ],
  declarations: [
    ThemeComponent,
    FooterComponent,
    HeaderComponent,
    HomepageComponent
  ],
  exports: [
    RouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [MDBSpinningPreloader]
})
export class ThemeModule { }
