import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { ComponentsModule } from '../../components/components.module';
import { routing } from './category.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeleteOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CategoryFormComponent } from './category-form/category-form.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { NgValidatorsModule } from '@ng-validators/ng-validators';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';

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
        NzToolTipModule,
        NgxMaskModule,
        NgValidatorsModule,
        NzCheckboxModule,
        NzDividerModule,
    ],
    declarations: [CategoryComponent, CategoryFormComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        RouterModule
    ],
})
export class CategoryModule { }
