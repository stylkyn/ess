import { IProduct } from './IProduct';
import { IPrice, initPrice } from './IPrice';
import { PaymentType } from './IPayment';
import { TransportType } from './ITransport';

export interface ICalculatedOrder {
    products: ICalculatedOrderProductOrder[];
    transport: ICalculatedOrderTransport;
    payment: ICalculatedOrderPayment;
    total: ICalculatedOrderTotalOrder;
}

export interface ICalculatedOrderPayment {
    paymentId: string;
    type: PaymentType;
    name: string;
    totalPrice: IPrice;
}

export interface ICalculatedOrderTransport {
    transportId: string;
    type: TransportType;
    name: string;
    totalPrice: IPrice;
}

export interface ICalculatedOrderTotalOrder {
    totalPrice: IPrice;
}

export interface ICalculatedOrderProductOrder {
    product: IProduct;
    count: number;
    totalPrice: IPrice;
}

export const calculateOrderInit: ICalculatedOrder = {
    products: [],
    payment: null,
    transport: null,
    total: {
        totalPrice: initPrice
    }
};
