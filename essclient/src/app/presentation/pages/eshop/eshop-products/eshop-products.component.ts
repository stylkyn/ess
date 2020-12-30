import { Component, OnInit } from '@angular/core';
import { ProductService, IProductSearchRequest } from '../../../../services/API/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService, ICategoryRequest } from './../../../../services/API/category.service';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { IProduct } from 'src/app/models/IProduct';
import { getProductRoute } from 'src/app/presentation/theme/presentation-routes';

@Component({
    selector: 'app-eshop-products',
    templateUrl: './eshop-products.component.html',
    styleUrls: []
})
export class EshopProductsComponent implements OnInit {
    public mapPriceTypes = MapPriceTypes;
    public products: IProduct[] = [];

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

    ngOnInit() {
        this._categoryService.getAll();
    }

    setActiveCategory(urlName: string) {
        // tslint:disable-next-line:curly
        if (!urlName) return;

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
            this.products = products.data;
        });
    }

     // show detail produkt
     showDetail(product: IProduct) {
        const category = this.categories.find(c => c.id == product.categoryId);
        this._router.navigateByUrl(getProductRoute(product, category));
    }

}
