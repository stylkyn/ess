import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './Shopping-cart.component.html',
  styleUrls: ['./Shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @ViewChild('basicModal',  {static: false}) basicModal;

  constructor() { }

  ngOnInit() {
    this.basicModal.show();
  }

}
