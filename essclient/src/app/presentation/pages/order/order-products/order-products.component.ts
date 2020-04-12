import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { orderTransportRoute, orderRoute } from '../order.routing';
import { BasketService } from 'src/app/services/storage/basket.service';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnInit {

  constructor(private _router: Router, public _basketService: BasketService) { }

  ngOnInit() {
  }

  onNext() {
    this._router.navigateByUrl(`${orderRoute}/${orderTransportRoute}`);
  }

}
