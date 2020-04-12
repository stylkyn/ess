import { Injectable } from '@angular/core';
import { ITransport } from 'src/app/models/ITransport';

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

    private loadFromStorage() {
        const transport: ITransport = JSON.parse(localStorage.getItem(TransportLocalStorageName));
        if (transport) {
            this.transportInStorage = transport;
        }
    }
}
