import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LocaleConfig } from 'ngx-daterangepicker-material';

@Component({
    selector: 'app-date-range',
    templateUrl: './date-range.component.html',
    styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
    private momentCs = moment;
    public minDate = moment(new Date());

    public config: LocaleConfig = {};
    public ranges: any = {
        'Dnes': [moment(), moment()],
        'Včera': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    };

    invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

    public isInvalidDate = (m: moment.Moment) =>  {
        return this.invalidDates.some(d => d.isSame(m, 'day'));
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
            customRangeLabel: 'Custom range',
            daysOfWeek: this.momentCs.weekdaysMin(),
            monthNames: this.momentCs.monthsShort(),
            firstDay: 1 // first day is monday
        };
    }

    ngOnInit() {
    }

}
