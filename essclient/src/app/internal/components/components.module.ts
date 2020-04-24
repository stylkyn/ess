import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { NzTableModule } from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        NzTableModule
    ],
    declarations: [
        TableComponent
    ],
    exports: [
        TableComponent,
        NzTableModule
    ],
    
})
export class ComponentsModule { }
