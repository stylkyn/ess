import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { routing } from './product.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';

import { DeleteOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ProductFormComponent } from './product-form/product-form.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

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
        NzIconModule.forChild([DeleteOutline, PlusOutline]),
        NzModalModule,
        NzDrawerModule,
        NzFormModule,
        NzSpinModule,
        NzSelectModule
    ],
    declarations: [ProductComponent, ProductFormComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
