import { Injectable } from '@angular/core';
import { ITransport } from 'src/app/models/ITransport';
import * as moment from 'moment';

const TransportLocalStorageName = 'transport';

@Injectable({
  providedIn: 'root'
})
export class TransportStorageService {
    public transportInStorage: ITransport = null;

    constructor() {
        this.loadFromStorage();
    }

    public set(transport: ITransport) {
        this.transportInStorage = transport;
        localStorage.setItem(TransportLocalStorageName, JSON.stringify(transport));
    }

    public reset() {
        this.transportInStorage = null;
        localStorage.removeItem(TransportLocalStorageName);
    }

    private loadFromStorage() {
        const transport: ITransport = JSON.parse(localStorage.getItem(TransportLocalStorageName));
        if (transport) {
            this.transportInStorage = transport;
        }
    }
}
