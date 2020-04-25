// base admin route
export const adminBaseRoute = 'is';

// sub routes
export const adminLoginRoute = `login`;
export const adminTaskRoute = `ukoly`;
export const adminDashRoute = `prehled`;
export const adminUserRoute = `uzivatele`;
export const adminCategoryRoute = `kategorie`;

// full paths
export const adminLoginFullRoute = `${adminBaseRoute}/${adminLoginRoute}`;
export const adminTaskFullRoute = `${adminBaseRoute}/${adminTaskRoute}`;
export const adminDashFullRoute = `${adminBaseRoute}/${adminDashRoute}`;
export const adminUserFullRoute = `${adminBaseRoute}/${adminUserRoute}`;
export const adminCategoryFullRoute = `${adminBaseRoute}/${adminCategoryRoute}`;
