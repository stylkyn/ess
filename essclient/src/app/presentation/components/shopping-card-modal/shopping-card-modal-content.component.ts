import { Component } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';

@Component({
    selector: 'app-shopping-card-modal-content',
    templateUrl: './shopping-card-modal-content.component.html',
    styleUrls: ['./shopping-card-modal-content.component.scss']
})
export class ShoppingCardModalContentComponent{
    constructor(
        public modalRef: MDBModalRef,
    ) {
    }
}
