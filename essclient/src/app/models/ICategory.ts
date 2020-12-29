
import { IImage } from './IImage';
export interface ICategory {
    id: string;
    urlName: string;
    parentCategoryId: string;
    isActive: boolean;
    image: IImage;
    name: string;
    subcategories: ICategory[];
}

export const initCategory: ICategory = {
    id: null,
    urlName: null,
    parentCategoryId: null,
    image: null,
    isActive: true,
    name: null,
    subcategories: []
};
