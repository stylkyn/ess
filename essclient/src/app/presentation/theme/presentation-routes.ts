// sub routes
import { IProduct } from './../../models/IProduct';
import { ICategory } from './../../models/ICategory';
import { IOrder } from 'src/app/models/IOrder';
export const presentationHomepage = `homepage`;
export const presentationProductRoute = `nase-produkty`;
export const presentationOrderRoute = `objednavka`;
export const presentationOrderSummaryRoute = `objednavka-souhrn`;
export const presentationMyAccountRoute = `muj-ucet`;
export const presentationMyAccountOrderRoute = `objednavky`;

export const presentationProductFullRoute = `${presentationProductRoute}`;
export const presentationMyAccountFullOrderRoute = `${presentationMyAccountRoute}/${presentationMyAccountOrderRoute}`;

export const getProductRoute = (product: IProduct, category: ICategory) => {
    return `${presentationProductFullRoute}/${category.urlName}/${product.urlName}`;
};

export const getOrderRoute = (order: IOrder) => {
    return `${presentationOrderSummaryRoute}/${order.id}`;
};