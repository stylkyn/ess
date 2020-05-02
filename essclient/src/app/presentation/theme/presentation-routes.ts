// sub routes
import { IProduct } from './../../models/IProduct';
import { ICategory } from './../../models/ICategory';
export const presentationProductRoute = `nase-produkty`;
export const presentationProductFullRoute = `${presentationProductRoute}`;

export const getProductRoute = (product: IProduct, category: ICategory) => {
    return `${presentationProductFullRoute}/${category.urlName}/${product.urlName}`;
};
