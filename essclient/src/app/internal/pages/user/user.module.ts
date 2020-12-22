import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ComponentsModule } from './../../../internal/components/components.module';
import { routing } from './user.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DeleteOutline, FileTwoTone } from '@ant-design/icons-angular/icons';
import { RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxMaskModule } from 'ngx-mask';
import { NgValidatorsModule } from '@ng-validators/ng-validators';

@NgModule({
    imports: [
        CommonModule,
        routing,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        
        NzTableModule,
        NzButtonModule,
        NzInputModule,
        NzIconModule,
        NzFormModule,
        FormsModule,
        NzDrawerModule,
        NzModalModule,
        NzSelectModule,
        NzGridModule,
        NzDividerModule,
        NzInputNumberModule,
        NzToolTipModule,
        NzIconModule.forChild([DeleteOutline, FileTwoTone]),
        NgxMaskModule,
        NgValidatorsModule
    ],
    declarations: [UserComponent, UserFormComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        RouterModule
    ],
})
export class UserModule { }
