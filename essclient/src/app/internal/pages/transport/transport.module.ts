import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { routing } from './transport.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransportComponent } from './transport.component';

import { DeleteOutline, PlusOutline, DownloadOutline, FileTwoTone, EyeOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TransportFormComponent } from './transport-form/transport-form.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RouterModule } from '@angular/router';

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
        NzIconModule.forChild([DeleteOutline, PlusOutline, DownloadOutline, FileTwoTone, EyeOutline]),
        NzModalModule,
        NzDrawerModule,
        NzFormModule,
        NzSpinModule,
        NzSelectModule,
        NzGridModule,
        NzDividerModule,
        NzRadioModule,
        NzInputNumberModule,
        NzToolTipModule
    ],
    declarations: [TransportComponent, TransportFormComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        RouterModule
    ],
})
export class TransportModule { }
