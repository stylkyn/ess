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

    type: ProductType;
    deposit: IProductDeposit;
    buy: IProductBuy;
    servis: IProductServis;

    totalPrice: IPrice;
}

export interface IProductDeposit {
    depositValue: IPrice;
    price: IPrice;
}

export interface IProductServis {
    price: IPrice;
    servisDate: Date;
}

export interface IProductBuy {
    price: IPrice;
}

export enum ProductType {
    Buy,
    Servis,
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
    gallery: [],
    type: null,
    deposit: null,
    servis: null,
    buy: null,
    totalPrice: null
};
