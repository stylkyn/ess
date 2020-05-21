import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { MDBSpinningPreloader,
    ButtonsModule, DropdownModule, SidenavModule, AccordionModule,
    IconsModule, CardsModule, NavbarModule, SelectModule, WavesModule, CarouselModule, InputsModule
} from 'ng-uikit-pro-standard';
import { routing } from './internal.routing';
import { CompareValidatorModule } from 'angular-compare-validator';
import { AdminAuthGuardService } from '../../services/guards/admin-auth-guard.service';
import { AdminAuthExistGuardService } from './../../services/guards/admin-auth-exist-guard.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetaModule } from 'ng2-meta';
import { metaConf } from 'src/app/presentation/theme/presentation.routing';

@NgModule({
    imports: [
        // plugins
        CommonModule,
        SidenavModule,
        NavbarModule,
        CardsModule,
        IconsModule,
        ButtonsModule,
        CardsModule.forRoot(),
        AccordionModule,
        SidenavModule,
        CompareValidatorModule,
        // my
        routing,
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
        InputsModule,
    ],
    declarations: [
        ThemeComponent
    ],
    providers: [
        MDBSpinningPreloader,
        AdminAuthGuardService,
        AdminAuthExistGuardService
    ],
    exports: [
        RouterModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ThemeModule { }
