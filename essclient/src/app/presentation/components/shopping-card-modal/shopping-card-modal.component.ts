import { Component } from '@angular/core';
import { MDBModalService } from 'ng-uikit-pro-standard';
import { ShoppingCardModalContentComponent } from './shopping-card-modal-content.component';

@Component({
  selector: 'app-shopping-card-modal',
  styleUrls: [],
  template: ''
})
export class ShoppingCardModalComponent {

  constructor (private modalService: MDBModalService) { }

  public showModal() {
    this.modalService.show(ShoppingCardModalContentComponent, {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: 'modal-right modal-lg modal-full-height',
        containerClass: 'right',
        animated: true
    });
  }
}