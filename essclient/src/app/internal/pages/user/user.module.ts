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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DeleteOutline } from '@ant-design/icons-angular/icons';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        routing,
        ComponentsModule,
        
        NzTableModule,
        NzButtonModule,
        NzInputModule,
        NzIconModule,
        FormsModule,
        NzModalModule,
        NzToolTipModule,
        NzIconModule.forChild([DeleteOutline]),
    ],
    declarations: [UserComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        RouterModule
    ],
})
export class UserModule { }
