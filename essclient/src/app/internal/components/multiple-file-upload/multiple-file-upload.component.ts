import { Component, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UploadFile, UploadXHRArgs } from 'ng-zorro-antd/upload/ng-zorro-antd-upload';
import { IImage } from 'src/app/models/IImage';
import { HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { NzMessageService } from 'ng-zorro-antd/message';
import { v4 as uuidv4 } from 'uuid';

type StatusImageUpload = 'done' | 'error';

@Component({
    selector: 'app-multiple-file-upload',
    templateUrl: './multiple-file-upload.component.html',
    styleUrls: ['./multiple-file-upload.component.scss']
})
export class MultipleFileUploadComponent implements OnInit, OnChanges {
    @Input() initial: IImage[];
    @Output() changed: EventEmitter<IImage[]> = new EventEmitter();
    imagesList: IImage[] = [];
    imagesForUploader = [];
    loading = false;
    previewImage: string | undefined = '';
    previewVisible = false;

    constructor (
        private _cloudinary: Cloudinary,
        private _http: HttpClient,
        private msg: NzMessageService
    ) { }

    ngOnInit() {
        this.imagesForUploader = this.initial?.map(i => this.toImageUploader(i, 'done')) ?? [];
        this.imagesList = this.initial;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.initial.currentValue?.length > 0) {
            this.imagesForUploader = changes.initial.currentValue?.map(i => this.toImageUploader(i, 'done')) ?? [];
            this.imagesList = changes.initial.currentValue;
        }
    }

    public reset() {
        this.imagesForUploader = [];
    }

    upload = (item: UploadXHRArgs) => {
        this.loading = true;
        const formData = new FormData();
        formData.append('file', item.file as any);
        formData.append('upload_preset', this._cloudinary.config().upload_preset);

        const req = new HttpRequest('POST', `https://api.cloudinary.com/v1_1/${this._cloudinary.config().cloud_name}/upload`, formData, {
            reportProgress: true,
            withCredentials: false,
        });
        return this._http.request(req).subscribe((event: HttpEvent<any>) => {
            if (event.type === HttpEventType.UploadProgress)
            {
                if (event.total > 0)
                    (event as any).percent = event.loaded / event.total * 100;
                item.onProgress(event, item.file);
            } else if (event instanceof HttpResponse)
            {
                this.loading = false;
                item.onSuccess(event.body, item.file, event);
            }
        }, (err) => {
            this.loading = false;
            item.onError(err, item.file);
        });
    }

    change(info: { file: UploadFile, fileList: UploadFile[] }): void {
        switch (info.file.status)
        {
            case 'uploading':
                this.loading = true;
                break;
            case 'done':
                const image: IImage = {
                    url: info.file.response.url,
                    secureUrl: info.file.response.secure_url,
                    publicId: info.file.response.public_id,
                    originalFileName: info.file.response.original_filename,
                    signature: info.file.response.signature,
                    createdAt: new Date(info.file.response.created_at)
                };
                this.loading = false;
                // replace file with file from cloudinary
                const replaceIndex = info.fileList.findIndex(x => x.uid == info.file.uid);
                info.fileList[replaceIndex] = this.toImageUploader(image, 'done');
                
                // pass to internal storage
                this.imagesList.push(image);
                this.changed.next(this.imagesList);
                
                break;
            case 'error':
                this.msg.error('Network error');
                this.loading = false;
                break;
        }
    }

    remove = (file: UploadFile) => {
        this.imagesList = this.imagesList.filter(x => x.secureUrl != file.url);
        this.changed.next(this.imagesList);
        return true;
    }

    setUploadHeader = (file: UploadFile) => {
        return {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
        };
    }

    async handlePreview(file: UploadFile) {
        this.previewImage = file.url;
        this.previewVisible = true;
    }

    // internal 
    private toImageUploader(image: IImage, status: StatusImageUpload) {
        const myId = uuidv4();
        return {
            uuid: myId,
            uid: (myId).toString(),
            name: image.originalFileName,
            url: image.secureUrl,
            status: status
        };
    }
}