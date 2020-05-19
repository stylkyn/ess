import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { RegisterModalContentComponent } from './register-modal-content.component';

@Component({
  selector: 'app-register-modal',
  template: '',
  styleUrls: []
})
export class RegisterModalComponent implements OnInit {
    @Output() showLogin: EventEmitter<any> = new EventEmitter();
    modalRef: MDBModalRef;
    
    constructor (private modalService: MDBModalService) { }

    ngOnInit() {
    }

    public showModal() {
        this.modalRef = this.modalService.show(RegisterModalContentComponent, {
            backdrop: true,
            keyboard: true,
            focus: true,
            show: false,
            ignoreBackdropClick: false,
            class: 'modal-center modal-md',
            containerClass: 'center',
            animated: true
        });
        this.modalRef.content.showLogin.subscribe(x => {
            this.showLogin.next(true);
        });
    }

}

