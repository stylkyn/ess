import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ITransportAddRequest, ITransportUpdateRequest, TransportService } from 'src/app/services/API/transport.service';
import { IImage } from '../../../../models/IImage';
import { FileUploadComponent } from '../../../components/file-upload/file-upload.component';
import { ITransport, TransportType } from './../../../../models/ITransport';
import { getTransportTypeName } from 'src/app/models/ITransport';

// tslint:disable-next-line:no-bitwise
type Type = 'update' | 'add';

@Component({
    selector: 'app-transport-form',
    templateUrl: './transport-form.component.html',
    styleUrls: ['./transport-form.component.scss']
})
export class TransportFormComponent {
    TransportType = TransportType;   
    getTransportTypeName = getTransportTypeName;
    @Output() changeData = new EventEmitter<ITransport>();
    @ViewChild('mainImageUploader') mainImageUploader: FileUploadComponent;
    
    activetransport: ITransport;
    mainImage: IImage;
    transportForm: FormGroup;
    visible = false;
    isLoading = false;

    get formType (): Type {
        return this.activetransport ? 'update' : 'add';
    }

    get type () { return this.transportForm.get('type'); }
    get name () { return this.transportForm.get('name'); }
    get description () { return this.transportForm.get('description'); }
    get isActive () { return this.transportForm.get('isActive'); }
    get price () { return this.transportForm.get('price'); }

    constructor (
        private _fb: FormBuilder,
        private _transportService: TransportService,
    ) { 
        this.transportForm = _fb.group({
            type: [TransportType.DeliveryPoint, Validators.required],
            name: ['', Validators.required],
            description: [''],
            isActive: [true, Validators.required],
            price: [null, [Validators.required, Validators.min(0)]],
        });
    }

    // price input set currency
    formatterCurrency = (value: number) => value || value == 0 ? `${value} Kč` : '';
    parserCurrency = (value: string) => value || value == '0' ? value.replace(' Kč', '') : '';

    // main image set
    mainImageChanged(image: IImage) {
        this.mainImage = image;
    }

    // drawer actions
    open(transport: ITransport = null): void {
        this.reset();
        this.activetransport = transport;
        this.visible = true;
        if (transport) {
            this.type.setValue(transport.type);
            this.name.setValue(transport.name);
            this.description.setValue(transport.description);
            this.price.setValue(transport.totalPrice?.czkWithoutVat);
            this.isActive.setValue(transport.isActive);
            this.mainImage = transport.image;
        }
    }

    close(): void {
        this.visible = false;
        this.activetransport = null;
    }

    confirm(): void {
        if (this.formType == 'add')
            this.add();
        else if (this.formType == 'update')
            this.update();

    }

    private reset() {
        this.transportForm.reset();
        this.transportForm.patchValue({
            type: TransportType.DeliveryPoint,
            isActive: true,
        });
        this.mainImageUploader.reset();
        this.mainImage = null;
    }

    private add(): void {
        this.isLoading = true;
        const request: ITransportAddRequest = {
            name: this.name.value,
            image: this.mainImage,
            description: this.description.value,
            type: this.type.value,
            isActive: this.isActive.value,
            priceWithoutVat: this.price.value,
        };
        this._transportService.add(request).subscribe((transport: ITransport) => {
            this.changeData.next(transport);
            this.reset();
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }

    private update(): void {
        this.isLoading = true;
        const request: ITransportUpdateRequest = {
            id: this.activetransport?.id,
            name: this.name.value,
            image: this.mainImage,
            description: this.description.value,
            type: this.type.value,
            isActive: this.isActive.value,
            priceWithoutVat: this.price.value,
        };
        this._transportService.update(request).subscribe((transport: ITransport) => {
            this.changeData.next(transport);
            this.reset();
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }
}
