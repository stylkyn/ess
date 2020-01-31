
import { IPrice, initPrice } from './IPrice';

export interface IProduct {
    id: string;
    name: string;
    urlName: string;
    previewDescription: string;
    description: string;
    price: IPrice;
    categoryId: string;
    previewName: string;
    previewImageUrl: string;
    gallery: string[];
}

// export const initProduct: IProduct = {
//     id: null,
//     name: null,
//     urlName: null,
//     previewDescription: null,
//     description: null,
//     price: initPrice,
//     categoryId: null,
//     previewName: null,
//     previewImageUrl: null,
//     gallery: []
// };

export const initProduct: IProduct = {
    id: null,
    name: null,
    urlName: null,
    previewDescription: null,
    description: null,
    price: initPrice,
    categoryId: null,
    previewName: null,
    previewImageUrl: 'https://cdn.pixabay.com/photo/2018/07/26/09/56/ecommerce-3563183__340.jpg',
    gallery: []
};
