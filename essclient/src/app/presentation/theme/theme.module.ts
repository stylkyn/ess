import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetaModule } from 'ng2-meta';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from './theme.component';
import { MDBSpinningPreloader, SidenavModule,
  WavesModule, AccordionModule, CarouselModule, InputsModule, NavbarModule } from 'ng-uikit-pro-standard';
import { routing, metaConf } from './presentation.routing';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
  CommonModule,
    // plugins
    SidenavModule,
    WavesModule,
    AccordionModule,
    NavbarModule,
    // my modules
    // routing
    routing,
    FormsModule,
    ReactiveFormsModule,
    // plugins
    MetaModule.forRoot(metaConf),
    CarouselModule,
    WavesModule,
    InputsModule

  ],
  declarations: [ThemeComponent, FooterComponent, HeaderComponent],
  exports: [ThemeComponent, FooterComponent, HeaderComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [MDBSpinningPreloader]
})
export class ThemeModule { }
