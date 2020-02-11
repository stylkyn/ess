import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @ViewChild('basicModal', {static: false}) basicModal;

  constructor() { }

  ngOnInit() {
  }

}