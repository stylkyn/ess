import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DeleteOutline, PlusOutline, PictureTwoTone } from '@ant-design/icons-angular/icons';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MultipleFileUploadComponent } from './multiple-file-upload/multiple-file-upload.component';

@NgModule({
    imports: [
        CommonModule,
        NzUploadModule,
        NzMessageModule,
        NzIconModule.forChild([DeleteOutline, PlusOutline, PictureTwoTone]),
        NzModalModule,
        CloudinaryModule
    ],
    declarations: [
        FileUploadComponent,
        MultipleFileUploadComponent
    ],
    exports: [
        FileUploadComponent,
        MultipleFileUploadComponent
    ]
})
export class ComponentsModule { }
