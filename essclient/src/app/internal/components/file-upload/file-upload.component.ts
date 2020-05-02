import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile, UploadXHRArgs } from 'ng-zorro-antd/upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { IImage } from './../../../models/IImage';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnChanges {
    @Input() initial: IImage;
    @Output() changed: EventEmitter<IImage> = new EventEmitter();
    activeImage: IImage;
    loading = false;

    constructor (
        private msg: NzMessageService,
        private _cloudinary: Cloudinary,
        private _http: HttpClient
    ) { }

    ngOnInit() {
        this.activeImage = this.initial;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.initial.currentValue)
            this.activeImage = changes.initial.currentValue;
    }

    public reset() {
        this.activeImage = null;
    }

    verify = (file: File) => {
        return new Observable((observer: Observer<boolean>) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng)
            {
                this.msg.error('Prosím nahrajte formát jpeg|png');
                observer.complete();
                return;
            }
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M)
            {
                this.msg.error('Foto může mít maximálně 10MB!');
                observer.complete();
                return;
            }
            observer.next(isJpgOrPng && isLt10M);
            observer.complete();
        });
    }

    setUploadHeader = (file: UploadFile) => {
        return {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
        };
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
                this.activeImage = {
                    url: event.body.url,
                    secureUrl: event.body.secure_url,
                    publicId: event.body.public_id,
                    originalFileName: event.body.original_filename,
                    signature: event.body.signature,
                    createdAt: new Date(event.body.created_at)
                };
                this.changed.next(this.activeImage);
                this.loading = false;
                item.onSuccess(event.body, item.file, event);
            }
        }, (err) => {
            this.loading = false;
            item.onError(err, item.file);
        });
    }

    change(info: { file: UploadFile }): void {
        switch (info.file.status) {
          case 'uploading':
            this.loading = true;
            break;
          case 'done':
              this.loading = false;
            break;
          case 'error':
            this.msg.error('Network error');
            this.loading = false;
            break;
        }
    }
    // async remove(image: IImage) {
    //     const request = {
    //         api_key: this._cloudinary.config().api_key,
    //         public_id: image.publicId,
    //         signature: image.signature,
    //         invalidate: true,
    //         timestamp: image.createdAt.getTime()
    //     };
    //     console.log(request);
    //     return await this._http.post(`https://api.cloudinary.com/v1_1/${this._cloudinary.config().cloud_name}/image/destroy`, request)
    //         .subscribe(x => true, (e) => false);
    // }
}
