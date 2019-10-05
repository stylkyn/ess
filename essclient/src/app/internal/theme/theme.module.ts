import { LoginCardComponent } from './../pages/login/login-card/login-card.component';
import { LoginComponent } from './../pages/login/login.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { ButtonsModule, DropdownModule, SidenavModule, AccordionModule,
  IconsModule, CardsModule, NavbarModule, SelectModule} from 'ng-uikit-pro-standard';
import { routing } from './internal.routing.';
import { SharedModule } from '../../shared/shared.module';
import { RegisterCardComponent } from '../pages/login/register-card/register-card.component';
import { CompareValidatorModule } from 'angular-compare-validator';

@NgModule({
  imports: [
    SharedModule,
    // plugins
    SidenavModule,
    NavbarModule,
    DropdownModule,
    CardsModule,
    IconsModule,
    ButtonsModule,
    CardsModule.forRoot(),
    AccordionModule,
    SidenavModule,
    CompareValidatorModule,
    // my
    routing
  ],
  declarations: [
    ThemeComponent,
    LoginComponent,
    LoginCardComponent,
    RegisterCardComponent
  ],
  exports: [
    ThemeComponent,
    LoginComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ThemeModule { }
