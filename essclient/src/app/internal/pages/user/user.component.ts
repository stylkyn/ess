import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UserService, ISearchUserRequest, userSortFieldMapReverse, UserSortField } from './../../../services/API/user.service';
import { sortTypeMapReverse, SortType } from 'src/app/models/shared/Sort';
import { IUser } from './../../../models/IUser';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    total = 1;
    dataList: IUser[] = [];
    loading = true;
    pageSize = 10;
    pageNumber = 1;
    fullText: string = null;
    sortType: SortType = null;
    sortField: UserSortField = null;

    constructor (private _userService: UserService) { }

    ngOnInit(): void {
        this.loadData();
    }

    fullTextChange(value: string) {
        this.loadData(value);
    }

    loadData(fullText: string = this.fullText, sortType = this.sortType, sortField = this.sortField): void {
        this.loading = true;

        const request: ISearchUserRequest = {
            fullText: fullText,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber - 1,
            sortField: sortField,
            sortType: sortType,
        };
        this._userService.search(request).subscribe(response => {
            this.loading = false;
            this.total = response.total;
            this.dataList = response.data;
        });
    }

    onQueryParamsChange(params: NzTableQueryParams): void {
        const { pageSize, pageIndex, sort, filter } = params;
        const currentSort = sort.find(item => item.value !== null);
        const sortField = (currentSort && currentSort.key) || null;
        const sortType = (currentSort && currentSort.value) || null;

        this.pageSize = pageSize;
        this.pageNumber = pageIndex;
        this.sortField = userSortFieldMapReverse.get(sortField);
        this.sortType = sortTypeMapReverse.get(sortType);

        this.loadData();
    }


}
