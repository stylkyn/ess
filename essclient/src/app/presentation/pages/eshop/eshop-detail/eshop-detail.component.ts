import { Component, OnInit } from '@angular/core';
import { ProductsService, IProductByUrlRequest } from 'src/app/services/API/product.service';
import { ActivatedRoute } from '@angular/router';
import { MapPriceTypes, MapVatTypes } from 'src/app/models/IPrice';
import { MyToastService } from 'src/app/services/toast.service';
import { BasketStorageService, IBasketProductStorage } from '../../../../services/storage/basket.service';

@Component({
    selector: 'app-eshop-detail',
    templateUrl: './eshop-detail.component.html',
    styleUrls: ['./eshop-detail.component.scss']
})
export class EshopDetailComponent implements OnInit {
    public mapPriceTypes = MapPriceTypes;
    public mapVatTypes = MapVatTypes;
    public productsCountOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        ];

    public get productsCount () {
        if (!this._productService.activeProduct) {
            return 0;
        }

        const selectedProduct = this._basketService.findSelectedProduct(this._productService.activeProduct.id);
        if (!selectedProduct) {
            return 0;
        }

        return selectedProduct.productsCount;
    }

    public get _activeProductVAT () {
        return this._activeProduct.buy && this.mapVatTypes(this._activeProduct.buy.price.vatType);
    }

    public get _activeProduct() {
        return this._productService.activeProduct;
    }

    constructor(
        public _productService: ProductsService,
        private _route: ActivatedRoute,
        private _toastService: MyToastService,
        private _basketService: BasketStorageService
        ) {
        this._route.url.subscribe(() => {
            const urlName = this._route.snapshot.paramMap.get('productUrlName');

            this.loadActiveProduct(urlName);
        });
    }

    ngOnInit() {
    }

    loadActiveProduct(urlName: string) {
        const request: IProductByUrlRequest = {
            urlName: urlName,
        };
        this._productService.fetchProductByUrl(request);
    }

    saveProductBasket(count: number, showAddedNotify = false) {
        if (showAddedNotify) {
            this._toastService.showSuccess('Přidáno do košíku');
        }

        if (count === 0) {
            this._toastService.showSuccess('Odebráno z košíku');
            this._basketService.removeProduct(this._productService.activeProduct.id);
            return;
        }

        const selectedProduct: IBasketProductStorage = {
            productId: this._productService.activeProduct.id,
            productsCount: count
        };
        this._basketService.setProduct(selectedProduct);
    }
}
