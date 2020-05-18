import { Injectable } from '@angular/core';
import * as moment from 'moment';

const ServiceDateLocalStorageName = 'service-date';

@Injectable({
  providedIn: 'root'
})
export class ServiceDateStorageService {
    public servisDateInStorage: moment.Moment = null;

    constructor() {
        this.loadFromStorage();
    }

    public set(serviceDate: moment.Moment) {
        this.servisDateInStorage = serviceDate;
        localStorage.setItem(ServiceDateLocalStorageName, JSON.stringify(serviceDate));
    }

    public reset() {
        this.servisDateInStorage = null;
        localStorage.removeItem(ServiceDateLocalStorageName);
    }

    private loadFromStorage() {
        const serviceDate: string = JSON.parse(localStorage.getItem(ServiceDateLocalStorageName));
        if (serviceDate) {
            this.servisDateInStorage = serviceDate && moment(serviceDate);
        }
    }
}
