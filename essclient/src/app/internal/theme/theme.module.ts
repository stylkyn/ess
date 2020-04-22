import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ThemeComponent } from './theme.component';
import {
    ButtonsModule, DropdownModule, SidenavModule, AccordionModule,
    IconsModule, CardsModule, NavbarModule, SelectModule
} from 'ng-uikit-pro-standard';
import { routing } from './internal.routing';
import { CompareValidatorModule } from 'angular-compare-validator';
import { AdminAuthGuardService } from '../../services/guards/admin-auth-guard.service';
import { AdminAuthExistGuardService } from './../../services/guards/admin-auth-exist-guard.service';

@NgModule({
    imports: [
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
        ThemeComponent
    ],
    providers: [
        AdminAuthGuardService,
        AdminAuthExistGuardService
    ],
    exports: [
        ThemeComponent
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export class ThemeModule { }
