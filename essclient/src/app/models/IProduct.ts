import { IPrice } from './IPrice';

export interface IProduct {
    id: string;
    name: string;
    urlName: string;
    previewDescription: string;
    description: string;
    categoryId: string;
    previewName: string;
    previewImageUrl: string;
    gallery: string[];
    deposit: IProductDeposit;
    buy: IProductBuy;
}

export interface IProductDeposit {
    depositValue: IPrice;
    price: IPrice;
}

export interface IProductBuy {
    price: IPrice;
}

export const initProduct: IProduct = {
    id: null,
    name: null,
    urlName: null,
    previewDescription: null,
    description: null,
    categoryId: null,
    previewName: null,
    previewImageUrl: null,
    gallery: [],
    deposit: null,
    buy: null
};
