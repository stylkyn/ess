import { Component, OnInit } from '@angular/core';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { getProductTypeName, ProductType } from 'src/app/models/IProduct';
import { IOrder, OrderState, OrderStateName } from 'src/app/models/IOrder';
import { OrderService, IOrderSearchRequest } from 'src/app/services/API/order.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/services/API/user.service';
import { IUserOption } from './../../../models/IUser';
import { NzTableQueryParams } from 'ng-zorro-antd/table/public-api';
import { getOrderRoute } from 'src/app/presentation/theme/presentation-routes';
import { PaymentState, PaymentStateName } from 'src/app/models/IPayment';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    MapPriceTypes = MapPriceTypes;
    PaymentState = PaymentState;
    OrderState = OrderState;
    OrderStateName = OrderStateName;
    PaymentStateName = PaymentStateName;

    total = 1;
    dataList: IOrder[] = [];
    
    paymentStateFilter: PaymentState;
    orderStateFilter: OrderState;
    userIdFilter: string;
    
    loading = true;
    pageSize = 10;
    pageNumber = 1;
    fullText: string = null;
    visibleRemovePopup: boolean;

    public get usersOptions () {
        return this._userService.userOptions;
    }

    constructor (
        private _orderService: OrderService, 
        private _userService: UserService, 
        private _modalNz: NzModalService,
        ) { }

    ngOnInit(): void {
        this.loadData();
        this.loadUserOptions();
    }

    // users logic
    loadUserOptions() {
        this._userService.getAllOptions();
    }

    userChanged(userId: string) {
        this.userIdFilter = userId;
        this.loadData();
    }

    // product type logic
    orderStateChanged(orderState: OrderState) {
        this.orderStateFilter = orderState;
        this.loadData();
    }

    // payment type logic
    paymentStateChanged(paymentState: PaymentState) {
        this.paymentStateFilter = paymentState;
        this.loadData();
    }

    // table logic
    fullTextChange(value: string) {
        this.loadData(value);
    }

    loadData(fullText: string = this.fullText): void {
        this.loading = true;

        const request: IOrderSearchRequest = {
            fullText: fullText,
            paymentState: this.paymentStateFilter,
            orderState: this.orderStateFilter,
            userId: this.userIdFilter,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber - 1,
        };
        this._orderService.search(request).subscribe(response => {
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


    // showDeleteConfirm(product: IProduct): void {
    //     this._modalNz.confirm({
    //         nzTitle: `Opravdu chcete smazat tento produkt?`,
    //         nzContent: `<b style="color: red;">${product.name}</br>`,
    //         nzOkText: 'Smazat',
    //         nzOkType: 'danger',
    //         nzOnOk: () => this.removeProduct(product),
    //         nzCancelText: 'Zrušit'
    //     });
    // }

    // show order detail
    showDetail(order: IOrder) {
        window.open(getOrderRoute(order));
    }
}
