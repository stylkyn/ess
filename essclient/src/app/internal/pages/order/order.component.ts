import { Component, OnInit, TemplateRef } from '@angular/core';
import { MapPriceTypes } from 'src/app/models/IPrice';
import { getProductTypeName, IProduct, ProductType } from 'src/app/models/IProduct';
import { IOrder, OrderState, OrderStateName } from 'src/app/models/IOrder';
import { OrderService, IOrderSearchRequest, ISetOrderPaymentState } from 'src/app/services/API/order.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/services/API/user.service';
import { IUserOption } from './../../../models/IUser';
import { NzTableQueryParams } from 'ng-zorro-antd/table/public-api';
import { getOrderRoute } from 'src/app/presentation/theme/presentation-routes';
import { PaymentState, PaymentStateName } from 'src/app/models/IPayment';
import { ISetOrderState, ISetOrderAgent } from './../../../services/API/order.service';
import { ICalculatedOrderProductOrder, ICalculatedOrderProductService } from 'src/app/models/ICalculateOrder';

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

    selectedChangeOrderState: OrderState;
    selectedChangePaymentState: PaymentState;
    selectedAgentId: string;
    selectedOrder: IOrder;

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

    public get hasService(): boolean { 
        return this._orderService.activeOrder?.calculatedData?.products.some(product => product.service) ?? false;
    }

    public get services(): ICalculatedOrderProductService[] { 
        return this._orderService.activeOrder?.calculatedData?.products.filter(product => product.service).map(x => x.service) ?? [];
    }

    public get usersOptions(): IUserOption[] {
        return this._userService.userOptions;
    }

    public findUserName(userId: string): string {
        return this.usersOptions.find(x => x.id == userId)?.name ?? 'Nepřiřazen';
    }

    public getServices(order: IOrder): ICalculatedOrderProductOrder[] {
        return order?.calculatedData?.products.filter(product => product.service) ?? [];
    }

    public hasUnassignedAgent(order: IOrder): boolean { 
        return order?.calculatedData?.products.some(product => product.service && !product.service.userId) ?? false;
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

    // change order state logic

    changeStateModal(order: IOrder, tplContent: TemplateRef<{}>): void {
        this.selectedChangeOrderState = order.state;
        this._modalNz.create({
            nzTitle: `Opravdu chcete zmenit stav objednávky?`,
            nzCancelText: 'Zrušit',
            nzOkText: 'Zmenit',
            nzOkType: 'primary',
            nzContent: tplContent,
            nzOnOk: () => this.changeOrderState(order)
        });
    }

    changeOrderState(order: IOrder) {
        const request: ISetOrderState = {
            orderId: order.id,
            state: this.selectedChangeOrderState
        };
        this._orderService.setOrderState(request)
            .subscribe(x => this.loadData());
    }

    selectedOrderStateChanged(orderState: OrderState) {
        this.selectedChangeOrderState = orderState;
    }

    // change paymnet state logic 

    changePaymnetStateModal(order: IOrder, tplContent: TemplateRef<{}>): void {
        this.selectedChangePaymentState = order.payment.state;
        this._modalNz.create({
            nzTitle: `Opravdu chcete zmenit stav platby?`,
            nzCancelText: 'Zrušit',
            nzOkText: 'Zmenit',
            nzOkType: 'primary',
            nzContent: tplContent,
            nzOnOk: () => this.changePaymentState(order)
        });
    }

    changePaymentState(order: IOrder) {
        const request: ISetOrderPaymentState = {
            orderId: order.id,
            paymentState: this.selectedChangePaymentState
        };
        this._orderService.setPaymentState(request)
            .subscribe(x => this.loadData());
    }

    selectedPaymentStateChanged(paymentState: PaymentState) {
        this.selectedChangePaymentState = paymentState;
    }

    // agent logic
    changeAgentSetupModal(order: IOrder, tplContent: TemplateRef<{}>) {
        this.selectedOrder = order;
        this._modalNz.create({
            nzTitle: `Správa agentů k objednávce - ${order.orderNumberFormatted}?`,
            nzCancelText: 'Zrušit',
            nzOkText: 'Zavřít',
            nzOkType: 'primary',
            
            nzContent: tplContent,
        });
    }

    // agent logic
    changeAssignAgentModal(order: IOrder, product: ICalculatedOrderProductOrder, tplContent: TemplateRef<{}>) {
        this.selectedChangePaymentState = order.payment.state;
        this._modalNz.create({
            nzTitle: `Opravdu chcete přiřadit agenta k servisu - ${order.orderNumberFormatted}?`,
            nzCancelText: 'Zrušit',
            nzOkText: 'Přiřadit',
            nzOkType: 'primary',
            
            nzContent: tplContent,
            nzOnOk: () => this.assignAgent(order, product)
        });
    }

    assignAgent(order: IOrder, product: ICalculatedOrderProductOrder) {
        const request: ISetOrderAgent = {
            orderId: order.id,
            productId: product.product.id,
            userId: this.selectedAgentId
        };
        console.log(product);
        this._orderService.setOrderAgent(request)
            .subscribe((orderResponse: IOrder) => { 
                this.selectedOrder = orderResponse;
                this.loadData();
                
            });
    }

    agentChange(userId: string) {
        this.selectedAgentId = userId;
    }

    // show order detail
    showDetail(order: IOrder) {
        window.open(getOrderRoute(order));
    }
}
