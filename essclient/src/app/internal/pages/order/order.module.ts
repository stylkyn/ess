import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { routing } from './order.routing';
import { ComponentsModule } from 'src/app/presentation/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DeleteOutline, PlusOutline, EyeOutline } from '@ant-design/icons-angular/icons';
import { NzFormModule } from 'ng-zorro-antd/form';

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
        NzIconModule.forChild([DeleteOutline, PlusOutline, EyeOutline]),
        NzModalModule,
        NzSpinModule,
        NzSelectModule,
        NzGridModule,
        NzToolTipModule,
        NzFormModule,
    ],
    declarations: [OrderComponent]
})
export class OrderModule { }
