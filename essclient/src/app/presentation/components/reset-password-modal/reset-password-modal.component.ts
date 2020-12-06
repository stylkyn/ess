import { Component, OnInit } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { ResetPasswordModalContentComponent } from './reset-password-modal-content.component';

@Component({
  selector: 'app-reset-password-modal',
  template: '',
  styleUrls: []
})
export class ResetPasswordModalComponent implements OnInit {
    modalRef: MDBModalRef;

    constructor (private modalService: MDBModalService) { }

    ngOnInit() {
    }

    public showModal() {
        this.modalRef = this.modalService.show(ResetPasswordModalContentComponent, {
            backdrop: true,
            keyboard: true,
            focus: true,
            show: false,
            ignoreBackdropClick: false,
            class: 'modal-center modal-md',
            containerClass: 'center',
            animated: true
        });
    }

}

