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
                title: 'Eshop',
                keywords: 'Elitec software eshop'
            }
        },
        children: [
            {
                path: '',
                component: EshopProductsComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Eshop produkty',
                        keywords: 'Producsts'
                    }
                }
            },
            {
                path: 'detail',
                component: EshopDetailComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Eshop detial',
                        keywords: 'detail'
                    }
                }
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
