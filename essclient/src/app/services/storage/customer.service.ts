import { Injectable } from '@angular/core';
import { IUserPersonal } from 'src/app/models/IUser';
import { IUserCompany } from './../../models/IUser';

export interface ICustomerStorage {
    personal: IUserPersonal;
    company: IUserCompany;
    invoiceToCompany: boolean;
    transportToSameAddress: boolean;
}

const customerLocalStorageName = 'customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerStorageService {
    public customerInStorage: ICustomerStorage = null;

    constructor() {
        this.loadFromStorage();
    }

    public set(customer: ICustomerStorage) {
        this.customerInStorage = customer;
        localStorage.setItem(customerLocalStorageName, JSON.stringify(customer));
    }

    public reset() {
        this.customerInStorage = null;
        localStorage.removeItem(customerLocalStorageName);
    }

    private loadFromStorage() {
        const customer: ICustomerStorage = JSON.parse(localStorage.getItem(customerLocalStorageName));
        if (customer) {
            this.customerInStorage = customer;
        }
    }
}
