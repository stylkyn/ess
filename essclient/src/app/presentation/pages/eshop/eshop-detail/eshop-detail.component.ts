import { Component, OnInit } from '@angular/core';
import { ProductService, IProductByUrlRequest } from 'src/app/services/API/product.service';
import { ActivatedRoute } from '@angular/router';
import { MapPriceTypes, MapVatTypes } from 'src/app/models/IPrice';
import { MyToastService } from 'src/app/services/toast.service';
import { BasketStorageService, IBasketProductStorage } from '../../../../services/storage/basket.service';
import { CategoryService } from './../../../../services/API/category.service';
import { ICategory } from './../../../../models/ICategory';
import { ProductType } from 'src/app/models/IProduct';

@Component({
    selector: 'app-eshop-detail',
    templateUrl: './eshop-detail.component.html',
    styleUrls: ['./eshop-detail.component.scss']
})
export class EshopDetailComponent implements OnInit {
    mapPriceTypes = MapPriceTypes;
    ProductType = ProductType;
    mapVatTypes = MapVatTypes;
    productsCountOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        ];

    get productsCount () {
        if (!this._productService.activeProduct) {
            return 0;
        }

        const selectedProduct = this._basketService.findSelectedProduct(this._productService.activeProduct.id);
        if (!selectedProduct) {
            return 0;
        }

        return selectedProduct.productsCount;
    }

    get category(): ICategory {
        return this._categoryService.categories.find(c => c.id == this._activeProduct.categoryId);
    }

    get _activeProductVAT () {
        return this._activeProduct.buy && this.mapVatTypes(this._activeProduct.buy.price.vatType);
    }

    get _activeProduct() {
        return this._productService.activeProduct;
    }

    constructor(
        public _productService: ProductService,
        private _route: ActivatedRoute,
        private _toastService: MyToastService,
        private _basketService: BasketStorageService,
        private _categoryService: CategoryService
        ) {
        this._route.url.subscribe(() => {
            const urlName = this._route.snapshot.paramMap.get('productUrlName');

            this.loadActiveProduct(urlName);
        });
    }

    ngOnInit() {
        this._categoryService.getAll();
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
