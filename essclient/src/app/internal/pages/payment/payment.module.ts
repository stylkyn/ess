import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { routing } from './paymentt.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment.component';

import { DeleteOutline, PlusOutline, DownloadOutline, FileTwoTone, EyeOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RouterModule } from '@angular/router';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
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
        NzCheckboxModule,
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
        NzToolTipModule,
        NgxMaskModule,
        NgValidatorsModule
    ],
    declarations: [PaymentComponent, PaymentFormComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        RouterModule
    ],
})
export class PaymentModule { }
