import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { ServiceDateContentComponent } from './service-date-content.component';
import { IProduct } from '../../../models/IProduct';
import * as moment from 'moment';

@Component({
  selector: 'app-service-date',
  template: '',
  styleUrls: []
})
export class ServiceDateComponent implements OnInit {
    @Input() product: IProduct;
    @Output() selectedDate = new EventEmitter<moment.Moment>();
    modalRef: MDBModalRef;
    
    constructor (private modalService: MDBModalService) { }

    ngOnInit() {
    }

    public showModal() {
        this.modalRef = this.modalService.show(ServiceDateContentComponent, {
            backdrop: true,
            center: true,
            keyboard: true,
            focus: true,
            show: false,
            ignoreBackdropClick: false,
            class: 'modal-center modal-lg',
            containerClass: 'center',
            animated: true,
            data: {
                product: this.product,
            }
        });
        this.modalRef.content.onSelectDate.subscribe(date =>  {
            this.selectedDate.next(date);
            this.modalRef.hide();
        });
    }
}
