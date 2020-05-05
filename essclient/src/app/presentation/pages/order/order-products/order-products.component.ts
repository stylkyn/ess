import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { orderTransportRoute } from '../order.routing';
import { BasketStorageService } from 'src/app/services/storage/basket.service';
import { presentationOrderRoute } from 'src/app/presentation/theme/presentation-routes';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnInit {

  constructor(private _router: Router, public _basketService: BasketStorageService) { }

  ngOnInit() {
  }

  onNext() {
    this._router.navigateByUrl(`${presentationOrderRoute}/${orderTransportRoute}`);
  }

}
