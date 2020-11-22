import { IImage } from './IImage';
import { IPrice } from './IPrice';

export interface IPayment {
    id: string;
    type: PaymentType;
    isActive: boolean;
    image: IImage;
    name: string;
    description: string;
    totalPrice: IPrice;
}


export enum PaymentType {
    CashOnDelivery,
    CashOnPlace,
    PaymentOrder,
}

export enum PaymentState {
    NotPaid,
    Paid
}

export const getPaymentTypeName = (type: PaymentType) => {
    switch (type) {
        case PaymentType.CashOnDelivery:
            return 'Dobirka';
        case PaymentType.CashOnPlace:
            return 'Platba při prevzetí';
        case PaymentType.PaymentOrder:
            return 'Platebním příkazem';
    }
    return '';
};

export const PaymentStateName = (state: PaymentState) => {
    switch (state) {
        case PaymentState.NotPaid:
            return 'Nezaplacená';
        case PaymentState.Paid:
            return 'Zaplacená';
    }
};