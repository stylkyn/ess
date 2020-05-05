import { IPrice } from './IPrice';

export interface IPayment {
    id: string;
    type: PaymentType;
    isActive: boolean;
    name: string;
    description: string;
    cashOnDelivery: ICashOnDeliveryPayment;
    paymentOrder: IPaymentOrder;
    price: IPrice;
}

// tslint:disable-next-line:no-empty-interface
export interface ICashOnDeliveryPayment {
}

// tslint:disable-next-line:no-empty-interface
export interface IPaymentOrder {
}

export enum PaymentType {
    CashOnDelivery,
    PaymentOrder
}

export enum PaymentState {
    NotPaid,
    Paid
}

export const PaymentStateName = (state: PaymentState) => {
    switch (state) {
        case PaymentState.NotPaid:
            return 'Nezaplacená';
        case PaymentState.Paid:
            return 'Zaplacená';
    }
};