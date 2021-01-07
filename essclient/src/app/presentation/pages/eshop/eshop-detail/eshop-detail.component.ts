import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService, IProductByUrlRequest } from 'src/app/services/API/product.service';
import { ActivatedRoute } from '@angular/router';
import { MapPriceTypes, MapVatTypes } from 'src/app/models/IPrice';
import { MyToastService } from 'src/app/services/toast.service';
import { BasketStorageService, IBasketProductStorage } from '../../../../services/storage/basket.service';
import { CategoryService, ICategoryRequest } from './../../../../services/API/category.service';
import { ICategory } from './../../../../models/ICategory';
import { ProductType } from 'src/app/models/IProduct';
import * as moment from 'moment';

@Component({
    selector: 'app-eshop-detail',
    templateUrl: './eshop-detail.component.html',
    styleUrls: ['./eshop-detail.component.scss']
})
export class EshopDetailComponent implements OnInit, OnDestroy {
    mapPriceTypes = MapPriceTypes;
    ProductType = ProductType;
    mapVatTypes = MapVatTypes;
    moment = moment;
    productsCountOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
    ];

    get productImage(): any[] {
        if (!this._activeProduct?.image) {
            return [];
        }
        const result = [
            {
                img: this._activeProduct.image.secureUrl,
                thumb: this._activeProduct.image.secureUrl,
                description: this._activeProduct.name,
            }
        ];
        return result;
    }

    get galleryImages(): any[] {
        if (!this._activeProduct?.gallery) {
            return [];
        }
        return this._activeProduct.gallery.map(i => ({
            img: i.secureUrl,
            thumb: i.secureUrl,
            description: i.originalFileName,
        }));
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

    get selectedProduct (): IBasketProductStorage {
        if (!this._activeProduct) {
            return null;
        }

        const selectedProduct = this._basketService.findSelectedProduct(this._productService.activeProduct.id);
        if (!selectedProduct) {
            return null;
        }

        return selectedProduct;
    }

    get productsCount (): number {
        const selectedProduct = this.selectedProduct;
        if (!selectedProduct) {
            return 0;
        }

        if (this._activeProduct.stock.count < selectedProduct.productsCount) {
            return this._activeProduct.stock.count;
        }
        return selectedProduct.productsCount;
    }

    constructor(
        public _productService: ProductService,
        private _route: ActivatedRoute,
        private _toastService: MyToastService,
        private _basketService: BasketStorageService,
        private _categoryService: CategoryService
        ) {
        this._route.url.subscribe(() => {
            const proudctUrlName = this._route.snapshot.paramMap.get('productUrlName');
            const categoryUrlName = this._route.snapshot.paramMap.get('categoryUrlName');

            this.setActiveCategory(categoryUrlName);
            this.loadActiveProduct(proudctUrlName);
        });
    }

    ngOnDestroy(): void {
        this._productService.activeProduct = null;
    }

    ngOnInit() {
        this._categoryService.getAll();
        window.scrollBy({ top: 0 });
    }

    setActiveCategory(urlName: string) {
        if (!urlName) {
            return;
        }

        const request: ICategoryRequest = {
            UrlName: urlName
        };
        this._categoryService.fetchActiveCategory(request);
    }

    loadActiveProduct(urlName: string) {
        const request: IProductByUrlRequest = {
            urlName: urlName,
        };
        this._productService.fetchProductByUrl(request);
    }

    onSelectDate(date: moment.Moment) {
        this._toastService.showSuccess('Přidáno do košíku');
        const selectedProduct: IBasketProductStorage = {
            productId: this._productService.activeProduct.id,
            serviceDate: date.toDate(),
            productsCount: 1
        };
        this._basketService.setProduct(selectedProduct);
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
