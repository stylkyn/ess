import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from 'ng2-meta';
import { EshopComponent } from './eshop.component';
import { ModuleWithProviders } from '@angular/core';
import { EshopDetailComponent } from './eshop-detail/eshop-detail.component';
import { EshopProductsComponent } from './eshop-products/eshop-products.component';


const APP_ROUTES: Routes = [
    // Main tamplate
    {
        path: '',
        component: EshopComponent,
        canActivate: [MetaGuard],
        data: {
            meta: {
                title: 'Naše produkty',
                keywords: 'Produkty Vyvoj'
            }
        },
        children: [
            {
                path: '',
                component: EshopProductsComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Produkty',
                        keywords: 'Producsts'
                    }
                }
            },
            {
                path: ':categoryUrlName',
                component: EshopProductsComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Produkty',
                        keywords: 'Producsts'
                    }
                }
            },
            {
                path: ':categoryUrlName/:productUrlName',
                component: EshopDetailComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Detail produktu',
                        keywords: 'detail'
                    }
                }
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
