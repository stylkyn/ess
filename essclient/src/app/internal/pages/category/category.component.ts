import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CategoryService, ISearchCategoryRequest } from '../../../services/API/category.service';
import { ICategory } from '../../../models/Icategory';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    total = 1;
    dataList: ICategory[] = [];
    loading = true;
    pageSize = 10;
    pageNumber = 1;
    fullText: string = null;
    visibleRemovePopup: boolean;


    constructor (private _categoryService: CategoryService, private _modalNz: NzModalService) { }

    ngOnInit(): void {
        this.loadData();
    }

    // table functionality

    fullTextChange(value: string) {
        this.loadData(value);
    }

    loadData(fullText: string = this.fullText): void {
        this.loading = true;

        const request: ISearchCategoryRequest = {
            fullText: fullText,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber - 1,
        };
        this._categoryService.search(request).subscribe(response => {
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

    removeCategory(category: ICategory) {
        this._categoryService.delete(category.id).subscribe(x => {
            this.loadData();
        });
    }

    // remove functionality
    showDeleteConfirm(category: ICategory): void {
        this._modalNz.confirm({
            nzTitle: `Opravdu chcete smazat tuto kategorii?`,
            nzContent: `<b style="color: red;">${category.name}</br>`,
            nzOkText: 'Smazat',
            nzOkType: 'danger',
            nzOnOk: () => this.removeCategory(category),
            nzCancelText: 'Zrušit'
        });
    }
}
