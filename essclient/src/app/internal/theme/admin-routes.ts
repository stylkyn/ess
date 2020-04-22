// base admin route
export const adminBaseRoute = 'is';

// sub routes
export const adminLoginRoute = `login`;
export const adminTaskRoute = `task`;
export const adminDashRoute = `dash`;

// full paths
export const adminLoginFullRoute = `${adminBaseRoute}/${adminLoginRoute}`;
export const adminTaskFullRoute = `${adminBaseRoute}/${adminTaskRoute}`;
export const adminDashFullRoute = `${adminBaseRoute}/${adminDashRoute}`;
