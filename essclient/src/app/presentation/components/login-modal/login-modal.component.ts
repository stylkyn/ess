import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { LoginModalContentComponent } from './login-modal-content.component';

@Component({
  selector: 'app-login-modal',
  template: '',
  styleUrls: []
})
export class LoginModalComponent implements OnInit {
    @Output() showRegister: EventEmitter<any> = new EventEmitter();
    modalRef: MDBModalRef;

    constructor (private modalService: MDBModalService) { }

    ngOnInit() {
    }

    public showModal() {
        this.modalRef = this.modalService.show(LoginModalContentComponent, {
            backdrop: true,
            keyboard: true,
            focus: true,
            show: false,
            ignoreBackdropClick: false,
            class: 'modal-center modal-md',
            containerClass: 'center',
            animated: true
        });
        this.modalRef.content.showRegister.subscribe(x => {
            this.showRegister.next(true);
        });
    }

}

