import { Component, OnInit } from '@angular/core';
import { MDBModalService } from 'ng-uikit-pro-standard';
import { RegisterModalContentComponent } from './register-modal-content.component';

@Component({
  selector: 'app-register-modal',
  template: '',
  styleUrls: []
})
export class RegisterModalComponent implements OnInit {

    constructor (private modalService: MDBModalService) { }

    ngOnInit() {
    }

    public showModal() {
        this.modalService.show(RegisterModalContentComponent, {
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

