import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ComponentsModule } from './../../../internal/components/components.module';
import { routing } from './user.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        routing,
        ComponentsModule,
        
        NzTableModule,
        NzButtonModule,
        NzInputModule,
        NzIconModule,
        FormsModule
    ],
    declarations: [UserComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
