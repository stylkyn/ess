import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from 'ng2-meta';
import { ModuleWithProviders } from '@angular/core';
import { OrderComponent } from './order.component';
import { OrderProductsComponent } from './order-products/order-products.component';


const APP_ROUTES: Routes = [
    // Main tamplate
    {
        path: '',
        component: OrderComponent,
        canActivate: [MetaGuard],
        data: {
            meta: {
                title: 'Košík | Elitec',
                keywords: 'Košík'
            }
        },
        children: [
            {
                path: '',
                component: OrderProductsComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Košík | Elitec',
                        keywords: 'Košík '
                    }
                }
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
