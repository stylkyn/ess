
import { IPrice } from './IPrice';

export interface IProduct {
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
