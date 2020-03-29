import { IProduct } from './IProduct';
import { IPrice, initPrice } from './IPrice';

export interface ICalculatedOrder {
    products: ICalculatedOrderProductOrder[];
    total: ICalculatedOrderTotalOrder;
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
    total: {
        totalPrice: initPrice
    }
};

