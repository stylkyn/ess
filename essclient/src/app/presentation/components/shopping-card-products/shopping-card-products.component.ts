import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { BasketService, IBasketProductStorage } from 'src/app/services/storage/basket.service';
import { OrderService, ICalculateOrderRequest } from './../../../services/API/order.service';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { ICalculatedOrderProductOrder } from 'src/app/models/IOrder';

@Component({
  selector: 'app-shopping-card-products',
  templateUrl: './shopping-card-products.component.html',
  styleUrls: ['./shopping-card-products.component.scss']
})
export class ShoppingCardProductsComponent implements OnInit {

    public mapPriceTypes = MapPriceTypes;

    public get calculatedOrder () {
        return this._orderService.calculatedOrder;
    }
    constructor(
        public _basketService: BasketService,
        public _orderService: OrderService
    ) {
    }

    ngOnInit(): void {
        this.calculateOrder();
    }

    removeProduct(product: ICalculatedOrderProductOrder) {
        this._basketService.removeProduct(product.product.id);
        this.calculateOrder();
    }

    onChangeProductCount(count: number, product: ICalculatedOrderProductOrder) {
        if (count == product.count) {
            return;
        }

        const request: IBasketProductStorage = {
            productId: product.product.id,
            productsCount: count
        };
        this._basketService.setProduct(request);
        this.calculateOrder();
    }

    calculateOrder () {
        const productsInBasket = this._basketService.productsInStorage;
        const request: ICalculateOrderRequest = {
            products: productsInBasket.map(x => ({
                productId: x.productId,
                count: x.productsCount
            }))
        };
        this._orderService.fetchCalculatedOrder(request);
    }

}
