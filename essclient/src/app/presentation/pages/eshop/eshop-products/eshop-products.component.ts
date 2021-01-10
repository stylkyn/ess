import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService, IProductSearchRequest } from '../../../../services/API/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService, ICategoryRequest } from './../../../../services/API/category.service';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { IProduct } from 'src/app/models/IProduct';
import { getProductRoute } from 'src/app/presentation/theme/presentation-routes';

@Component({
    selector: 'app-eshop-products',
    templateUrl: './eshop-products.component.html',
    styleUrls: ['./eshop-products.component.scss']
})
export class EshopProductsComponent implements OnInit, OnDestroy {
    public mapPriceTypes = MapPriceTypes;
    public products: IProduct[] = [];
    public isCategoryEmpty = true;

    get categories () {
        return this._categoryService.categories;
    }

    constructor (
        public _categoryService: CategoryService,
        public _productService: ProductService,
        private _router: Router,
        private _route: ActivatedRoute) {
        this._route.url.subscribe(() => {
            const urlName = this._route.snapshot.paramMap.get('categoryUrlName');

            this.setActiveCategory(urlName);
            this.loadProducts(urlName);
        });
    }

    ngOnDestroy(): void {
        this._categoryService.activeCategory = null;
    }

    ngOnInit() {
        this._categoryService.getAll();
        window.scrollBy({ top: 0 });
    }

    setActiveCategory(urlName: string) {
        if (!urlName) {
            this.isCategoryEmpty = true;
            return;
        }

        this.isCategoryEmpty = false;
        const request: ICategoryRequest = {
            UrlName: urlName
        };
        this._categoryService.fetchActiveCategory(request);
    }

    loadProducts(categoryUrlName: string) {
        const request: IProductSearchRequest = {
            categoryUrlName: categoryUrlName,
        };
        this._productService.search(request).subscribe(products => { 
            if (this.isCategoryEmpty) {
                this.products = products.data.slice(0, products.data.length <= 12 ? products.data.length : 12);
            } else {
                this.products = products.data;
            }
        });
    }

     // show detail produkt
    showDetail(product: IProduct) {
        const category = this.categories.find(c => c.id == product.categoryId);
        this._router.navigateByUrl(getProductRoute(product, category));
    }

}
