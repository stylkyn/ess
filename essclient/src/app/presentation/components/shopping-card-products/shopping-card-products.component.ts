import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { BasketStorageService, IBasketProductStorage } from 'src/app/services/storage/basket.service';
import { OrderService, ICalculateOrderRequest } from './../../../services/API/order.service';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { ICalculatedOrderProductOrder, ICalculatedOrderTotalOrder } from 'src/app/models/ICalculateOrder';
import { TransportStorageService } from 'src/app/services/storage/transport.service';
import { PaymentStorageService } from './../../../services/storage/payment.service';
import { IProduct, ProductType } from 'src/app/models/IProduct';
import * as moment from 'moment';
import { getProductRoute } from '../../theme/presentation-routes';
import { Router } from '@angular/router';
import { ICategory } from './../../../models/ICategory';
import { CategoryService } from './../../../services/API/category.service';

@Component({
  selector: 'app-shopping-card-products',
  templateUrl: './shopping-card-products.component.html',
  styleUrls: ['./shopping-card-products.component.scss']
})
export class ShoppingCardProductsComponent implements OnInit {

    mapPriceTypes = MapPriceTypes;
    ProductType = ProductType;
    moment = moment;

    public get calculatedOrder () {
        return this._orderService.calculatedOrder;
    }

    public get categories (): ICategory[] {
        return this._categoryService.categories;
    }

    public get products (): ICalculatedOrderProductOrder[] {
        return this._orderService.calculatedOrder?.products ?? [];
    }

    public get total (): ICalculatedOrderTotalOrder {
        return this._orderService.calculatedOrder?.total;
    }
    constructor(
        public _basketStorage: BasketStorageService,
        public _transportStorage: TransportStorageService,
        public _paymentStorage: PaymentStorageService,
        public _categoryService: CategoryService,
        public _orderService: OrderService,
        public _router: Router,
        private _modalService: MDBModalService
    ) {
        this._categoryService.getAllOnce();
    }

    ngOnInit(): void {
        this.calculateOrder();
    }

    removeProduct(product: ICalculatedOrderProductOrder) {
        this._basketStorage.removeProduct(product.product.id);
        this.calculateOrder();
    }

    onChangeProductCount(count: number, product: ICalculatedOrderProductOrder) {
        if (this.hasInvalidCount(count, product)) {
            return;
        }

        const request: IBasketProductStorage = {
            productId: product.product.id,
            productsCount: count > product.product.stock.count 
                ? product.product.stock.count 
                : count
        };
        this._basketStorage.setProduct(request);
        this.calculateOrder();
    }

    showDetail(product: ICalculatedOrderProductOrder) {
        const category = this.categories.find(c => c.id == product.product.categoryId);
        this._router.navigateByUrl(getProductRoute(product.product, category));
        this._modalService.hide(1);
    }

    calculateOrder () {
        const productsInBasket = this._basketStorage.productsInStorage;
        const transportId = this._transportStorage.transportInStorage?.id;
        const paymentId = this._paymentStorage.paymentInStorage?.id;
        const request: ICalculateOrderRequest = {
            products: productsInBasket.map(x => ({
                productId: x.productId,
                count: x.productsCount,
                serviceDate: x.serviceDate
            })),
            transportId: transportId,
            paymentId: paymentId
        };
        this._orderService.fetchCalculatedOrder(request);
    }

    private hasInvalidCount(count: number, product: ICalculatedOrderProductOrder) { 
        return count == product.count || count <= 0;
    }
}
