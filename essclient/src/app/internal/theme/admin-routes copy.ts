// base admin route
export const adminBaseRoute = 'is';

// sub routes
export const adminLoginRoute = `login`;
export const adminTaskRoute = `ukoly`;
export const adminDashRoute = `prehled`;
export const adminUserRoute = `uzivatele`;
export const adminCategoryRoute = `kategorie`;
export const adminProductRoute = `produkty`;
export const adminOrderRoute = `objednavky`;
export const adminSettingsRoute = `nastaveni`;
export const adminTransportRoute = `doprava`;
export const adminPaymentRoute = `platba`;

// full paths
export const adminLoginFullRoute = `${adminBaseRoute}/${adminLoginRoute}`;
export const adminTaskFullRoute = `${adminBaseRoute}/${adminTaskRoute}`;
export const adminDashFullRoute = `${adminBaseRoute}/${adminDashRoute}`;
export const adminUserFullRoute = `${adminBaseRoute}/${adminUserRoute}`;
export const adminCategoryFullRoute = `${adminBaseRoute}/${adminCategoryRoute}`;
export const adminProductFullRoute = `${adminBaseRoute}/${adminProductRoute}`;
export const adminOrderFullRoute = `${adminBaseRoute}/${adminOrderRoute}`;
