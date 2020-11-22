import { IProduct } from './IProduct';
import { IPrice, initPrice } from './IPrice';
import { IPayment, PaymentType } from './IPayment';
import { ITransport, TransportType } from './ITransport';

export interface ICalculatedOrder {
    products: ICalculatedOrderProductOrder[];
    transport: ICalculatedOrderTransport;
    payment: ICalculatedOrderPayment;
    total: ICalculatedOrderTotalOrder;
}

export interface ICalculatedOrderPayment {
    paymentId: string;
    sourceData: IPayment;
}

export interface ICalculatedOrderTransport {
    transportId: string;
    sourceData: ITransport;
}

export interface ICalculatedOrderTotalOrder {
    totalPrice: IPrice;
}

export interface ICalculatedOrderProductOrder {
    product: IProduct;
    service: ICalculatedOrderProductService;
    count: number;
    totalPrice: IPrice;
}

export interface ICalculatedOrderProductService
{
    date: Date | string | null;
    userId: string; // user agent id
    done: boolean;
}

export const calculateOrderInit: ICalculatedOrder = {
    products: [],
    payment: null,
    transport: null,
    total: {
        totalPrice: initPrice
    }
};

