// sub routes
import { IProduct } from './../../models/IProduct';
import { ICategory } from './../../models/ICategory';
import { IOrder } from 'src/app/models/IOrder';
export const presentationHomepage = `homepage`;
export const presentationContactRoute = `kontakt`;
export const presentationAboutUsRoute = `o-nas`;
export const presentationProductRoute = `nase-produkty`;
export const presentationOrderRoute = `objednavka`;
export const presentationOrderSummaryRoute = `objednavka-souhrn`;
export const presentationMyAccountRoute = `muj-ucet`;
export const presentationMyAccountOrderRoute = `objednavky`;
export const presentationMyAccountUserProfile = `profil`;
export const presentationAgentRoute = `agent`;
export const presentationAgentOrdersRoute = `orders`;

export const presentationAgentOrdersFullRoute = `${presentationAgentRoute}/${presentationAgentOrdersRoute}`;
export const presentationProductFullRoute = `${presentationProductRoute}`;
export const presentationMyAccountFullOrderRoute = `${presentationMyAccountRoute}/${presentationMyAccountOrderRoute}`;
export const presentationMyAccountFullProfileRoute = `${presentationMyAccountRoute}/${presentationMyAccountUserProfile}`;

export const getProductRoute = (product: IProduct, category: ICategory) => {
    return `${presentationProductFullRoute}/${category.urlName}/${product.urlName}`;
};

export const getOrderRoute = (order: IOrder) => {
    return `${presentationOrderSummaryRoute}/${order.id}`;
};