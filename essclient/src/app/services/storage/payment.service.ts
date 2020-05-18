import { Injectable } from '@angular/core';
import { IPayment } from 'src/app/models/IPayment';

const paymentLocalStorageName = 'payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentStorageService {
    public paymentInStorage: IPayment = null;

    constructor() {
        this.loadFromStorage();
    }

    public set(payment: IPayment) {
        this.paymentInStorage = payment;
        localStorage.setItem(paymentLocalStorageName, JSON.stringify(payment));
    }

    public reset() {
        this.paymentInStorage = null;
        localStorage.removeItem(paymentLocalStorageName);
    }

    private loadFromStorage() {
        const payment: IPayment = JSON.parse(localStorage.getItem(paymentLocalStorageName));
        if (payment) {
            this.paymentInStorage = payment;
        }
    }
}
