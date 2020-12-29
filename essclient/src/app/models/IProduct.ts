import { IPrice } from './IPrice';
import { IImage } from './IImage';

export interface IProduct {
    id: string;
    categoryId: string;
    name: string;
    urlName: string;
    description: string;

    previewName: string;
    previewDescription: string;
    image: IImage;
    gallery: IImage[];

    isActive: boolean;
    type: ProductType;
    deposit: IProductDeposit;
    buy: IProductBuy;
    service: IProductService;
    stock: IProductStock;

    totalPrice: IPrice;
}

export interface IProductStock {
    count: number;
    preOrderDays: number;
}

export interface IProductDeposit {
    depositValue: IPrice;
    price: IPrice;
    availabilities: IProductAvailability[];
}

export interface IProductService {
    price: IPrice;
    availabilities: IProductAvailability[];
}

export interface IProductBuy {
    price: IPrice;
}

export interface IProductAvailability
{
    day: string;
    freeCapacity: number;
}

export const getProductTypeName = (type: ProductType) => {
    switch (type) {
        case ProductType.Buy:
            return 'Produkt';
        case ProductType.Deposit:
            return 'Pronájem';
        case ProductType.Service:
            return 'Služba';
        }
    return '';
};

export enum ProductType {
    Buy,
    Service,
    Deposit
}

export const initProduct: IProduct = {
    id: null,
    name: null,
    urlName: null,
    previewDescription: null,
    description: null,
    categoryId: null,
    previewName: null,
    image: null,
    isActive: true,
    gallery: [],
    type: null,
    deposit: null,
    service: null,
    buy: null,
    totalPrice: null,
    stock: {
        count: null,
        preOrderDays: null,
    }
};
