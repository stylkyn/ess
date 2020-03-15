import { Component, OnInit } from '@angular/core';
import { MDBModalService } from 'ng-uikit-pro-standard';
import { LoginModalContentComponent } from './login-modal-content.component';

@Component({
  selector: 'app-login-modal',
  template: '',
  styleUrls: []
})
export class LoginModalComponent implements OnInit {

    constructor (private modalService: MDBModalService) { }

    ngOnInit() {
    }

    public showModal() {
        this.modalService.show(LoginModalContentComponent, {
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

