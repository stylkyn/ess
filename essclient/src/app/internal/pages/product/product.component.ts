import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ProductService, IProductSearchRequest, IProductSearchExtendRequest } from '../../../services/API/product.service';
import { IProduct, getProductTypeName, ProductType } from '../../../models/Iproduct';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductFormComponent } from './product-form/product-form.component';
import { CategoryService } from './../../../services/API/category.service';
import { ICategory } from 'src/app/models/ICategory';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { getProductRoute } from 'src/app/presentation/theme/presentation-routes';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    MapPriceTypes = MapPriceTypes;
    getProductTypeName = getProductTypeName;
    ProductType = ProductType;
    @ViewChild('productForm') productForm: ProductFormComponent;

    total = 1;
    dataList: IProduct[] = [];
    categories: ICategory[];
    activeCategoryIdFilter: string;
    activeProductType: ProductType;
    loading = true;
    pageSize = 10;
    pageNumber = 1;
    fullText: string = null;
    visibleRemovePopup: boolean;


    constructor (
        private _productService: ProductService, 
        private _categoryService: CategoryService,
        private _modalNz: NzModalService,
        ) { }

    ngOnInit(): void {
        this.loadData();
        this.loadCategories();
    }

    // categoreis logic
    loadCategories() {
        this._categoryService.getAll()
            .then(categories => this.categories = categories);
    }

    getCategoryName(categoryId: string): string {
        return this.categories?.find(c => c.id == categoryId)?.name ?? '-';
    }

    categoryChanged(categoryId: string) {
        this.activeCategoryIdFilter = categoryId;
        this.loadData(this.fullText, categoryId);
    }

    // product type logic
    productTypeChanged(productType: ProductType) {
        this.activeProductType = productType;
        this.loadData(this.fullText, this.activeCategoryIdFilter, productType);
    }

    // table logic
    fullTextChange(value: string) {
        this.loadData(value);
    }

    loadData(fullText: string = this.fullText, activeCategoryId: string = this.activeCategoryIdFilter, productType = this.activeProductType): void {
        this.loading = true;

        const request: IProductSearchExtendRequest = {
            fullText: fullText,
            categoryId: activeCategoryId,
            productType: productType,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber - 1,
        };
        this._productService.searchExtend(request).subscribe(response => {
            this.loading = false;
            this.total = response.total;
            this.dataList = response.data;
        });
    }
    

    onQueryParamsChange(params: NzTableQueryParams): void {
        const { pageSize, pageIndex } = params;

        this.pageSize = pageSize;
        this.pageNumber = pageIndex;
        this.loadData();
    }

    // update logic
    showUpdateDrawer(product: IProduct) {
        this.productForm.open(product);
    }

    // remove logic
    removeProduct(product: IProduct) {
        this._productService.delete(product.id).subscribe(x => {
            this.loadData();
        });
    }

    showDeleteConfirm(product: IProduct): void {
        this._modalNz.confirm({
            nzTitle: `Opravdu chcete smazat tento produkt?`,
            nzContent: `<b style="color: red;">${product.name}</br>`,
            nzOkText: 'Smazat',
            nzOkType: 'danger',
            nzOnOk: () => this.removeProduct(product),
            nzCancelText: 'Zrušit'
        });
    }

    // show detail produkt
    showDetail(product: IProduct) {
        const category = this.categories.find(c => c.id == product.categoryId);
        window.open(getProductRoute(product, category));
    }
}
