import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UserService, ISearchUserRequest, userSortFieldMapReverse, UserSortField, IPromoteAgentRequest, IPromoteAdminRequest } from './../../../services/API/user.service';
import { sortTypeMapReverse, SortType } from 'src/app/models/shared/Sort';
import { IUser } from './../../../models/IUser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    @ViewChild('userForm') userForm: UserFormComponent;
    
    total = 1;
    dataList: IUser[] = [];
    loading = true;
    pageSize = 10;
    pageNumber = 1;
    fullText: string = null;
    sortType: SortType = null;
    sortField: UserSortField = null;

    public get loggedUser(): IUser {
        return this._userService.user;
    }

    constructor (
        private _userService: UserService,
        private _modalNz: NzModalService
    ) { }

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
        const { pageSize, pageIndex, sort } = params;
        const currentSort = sort.find(item => item.value !== null);
        const sortField = (currentSort && currentSort.key) || null;
        const sortType = (currentSort && currentSort.value) || null;

        this.pageSize = pageSize;
        this.pageNumber = pageIndex;
        this.sortField = userSortFieldMapReverse.get(sortField);
        this.sortType = sortTypeMapReverse.get(sortType);

        this.loadData();
    }

    // update logic
    showUpdateDrawer(user: IUser) {
        this.userForm.open(user);
    }

    showPromoteAdminModal(user: IUser): void {
        this._modalNz.confirm({
            nzTitle: `Opravdu chcete uživatele povýšit na administrátora?`,
            nzContent: `<b style="color: red;">${user.personal.firstname} ${user.personal.lastname}</br>`,
            nzOkText: 'Povýšit',
            nzOkType: 'primary',
            nzOnOk: () => this.promoteAdmin(user),
            nzCancelText: 'Zrušit'
        });
    }

    promoteAdmin(user: IUser) {
        const request: IPromoteAdminRequest = {
            userId: user.id
        };
        this._userService.promoteAdmin(request).subscribe(_ => this.loadData());
    }

    showPromoteAgentModal(user: IUser): void {
        this._modalNz.confirm({
            nzTitle: `Opravdu chcete uživatele povýšit na agenta?`,
            nzContent: `<b style="color: red;">${user.personal.firstname} ${user.personal.lastname}</br>`,
            nzOkText: 'Povýšit',
            nzOkType: 'primary',
            nzOnOk: () => this.promoteAgent(user),
            nzCancelText: 'Zrušit'
        });
    }

    promoteAgent(user: IUser) {
        const request: IPromoteAgentRequest = {
            userId: user.id
        };
        this._userService.promoteAgent(request).subscribe(_ => this.loadData());
    }

    // remove logic
    removeUser(user: IUser) {
        this._userService.delete(user.id).subscribe(x => {
            this.loadData();
        });
    }

    showDeleteConfirm(user: IUser): void {
        this._modalNz.confirm({
            nzTitle: `Opravdu chcete odstranit uživatele?`,
            nzContent: `<b style="color: red;">${user.personal?.firstname} ${user.personal?.lastname} | ${user.email}</br>`,
            nzOkText: 'Smazat',
            nzOkType: 'danger',
            nzOnOk: () => this.removeUser(user),
            nzCancelText: 'Zrušit'
        });
    }
}
