import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { LocaleConfig } from 'ngx-daterangepicker-material';

@Component({
    selector: 'app-date-range',
    templateUrl: './date-range.component.html',
    styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit, OnChanges {
    @Input() invalidFunction: (day: moment.Moment) => boolean;
    @Output() changeSelectedDate = new EventEmitter<moment.Moment>();
    @Input() selectedDate: moment.Moment;
    selectedDateInternal: moment.Moment = moment(new Date());

    private momentCs = moment;
    public minDate: moment.Moment;
    public maxDate: moment.Moment;
    public config: LocaleConfig = {};

    public isInvalidDate = (day: moment.Moment) => {
        return this.invalidFunction(day);
    }

    constructor() {
        this.momentCs.locale('cs');
        this.config = {
            format: 'MM/DD/YYYY', // could be 'YYYY-MM-DDTHH:mm:ss.SSSSZ'
            direction: 'ltr', // could be rtl
            weekLabel: 'T',
            // separator: ' - ', // default is ' - '
            cancelLabel: 'Zrušit', // detault is 'Cancel'
            applyLabel: 'Potvrdit', // detault is 'Apply'
            clearLabel: 'Smazat', // detault is 'Clear'
            daysOfWeek: this.momentCs.weekdaysMin(),
            monthNames: this.momentCs.monthsShort(),
            firstDay: 1 // first day is monday
        };

        this.minDate = moment(new Date());
        this.minDate.add(1, 'd');

        this.maxDate = moment(this.minDate);
        this.maxDate.add(1, 'M');
    }

    ngOnInit() {
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if (simpleChanges.selectedDate.currentValue) {
            this.selectedDateInternal = simpleChanges.selectedDate.currentValue;
        }
    }


    changeDate(date: { startDate: moment.Moment}): void {
        this.selectedDate = date.startDate;
        this.changeSelectedDate.next(date.startDate);
    }
}
