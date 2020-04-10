import { IPrice } from './IPrice';

export interface IPayment {
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
