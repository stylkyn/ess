import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ComponentsModule } from './../../../internal/components/components.module';
import { routing } from './user.routing';

@NgModule({
    imports: [
        CommonModule,
        routing,
        ComponentsModule,
    ],
    declarations: [UserComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
