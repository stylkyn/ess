import { Component, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { OrderService } from 'src/app/services/API/order.service';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { IProduct } from '../../../models/IProduct';
import { compareDate } from 'src/app/utils/dateUtils';

@Component({
  selector: 'app-service-date-content',
  templateUrl: './service-date-content.component.html',
  styleUrls: ['./service-date-content.component.scss']
})
export class ServiceDateContentComponent {
    product: IProduct;
    public onSelectDate = new EventEmitter<moment.Moment>();
    public selectedServiceDate: moment.Moment;

    public get minDate (): moment.Moment {
        return moment(this.product?.service?.availabilities[0]?.day ?? new Date());
     }
 
    public get maxDate (): moment.Moment {
         const datesLength = this.product?.service?.availabilities.length;
         return moment(this.product?.service?.availabilities[datesLength - 1]?.day ?? new Date());
     }
 
    public get calculatedOrder () {
        return this._orderService.calculatedOrder;
    }

    public get showServiceCard(): boolean {
        return this._orderService?.hasService;
    }

    constructor(
        public _modalRef: MDBModalRef,
        private _orderService: OrderService,
    ) { }

    selectedDate(date: moment.Moment) {
        this.selectedServiceDate = date;
    }

    confirmDate() {
        this.onSelectDate.next(this.selectedServiceDate);
    }

    isInvalidDay = (day: moment.Moment): boolean => (
        this.product?.service?.availabilities?.some(a =>  
            compareDate(moment(a.day), day) && a.freeCapacity == 0
        ) ?? true
    )

}
