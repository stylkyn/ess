import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from 'ng2-meta';
import { ModuleWithProviders } from '@angular/core';
import { OrderSummaryComponent } from './order-summary.component';

export const orderSummaryRoute = 'objednavka-souhrn';

const APP_ROUTES: Routes = [
    {
        path: `:orderId`,
        component: OrderSummaryComponent,
        canActivate: [MetaGuard],
        data: {
            meta: {
                title: 'Souhrn objednávky | Elitec',
                keywords: 'Souhrn Objednávka'
            }
        }
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
