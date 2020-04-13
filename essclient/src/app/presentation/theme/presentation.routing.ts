import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { MetaGuard, MetaConfig } from 'ng2-meta';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { orderSummaryRoute } from '../pages/order-summary/order-summary.routing';

export const orderRoute = 'objednavka';

// defaultni data pro meta tagy
const metaConfig: MetaConfig = {
    useTitleSuffix: true,
    defaults: {
        description: 'Elitec software zpracovani internich systemu na zakazku',
        author: 'elitecsoftware.cz'
    }
  };

const APP_ROUTES: Routes = [
    // Main tamplate
    { path: '', pathMatch: 'full', redirectTo: 'homepage' },
    { path: '', component: ThemeComponent, children: [
        {
            path: 'homepage',
            component: HomepageComponent,
            canActivate: [MetaGuard],
            data: {
                meta: {
                    title: 'Homepage',
                    keywords: 'Software development, vyvoj softwaru'
                }
            }
        },
        {
            path: 'nase-produkty',
            loadChildren: () => import('./../pages/eshop/eshop.module').then(mod => mod.EshopModule)
        },
        {
            path: 'objednavka',
            loadChildren: () => import('./../pages/order/order.module').then(mod => mod.OrderModule)
        },
        {
            path: orderSummaryRoute,
            loadChildren: () => import('./../pages/order-summary/order-summary.module').then(mod => mod.OrderSummaryModule)
        }
    ]}
];

export const metaConf = metaConfig;
export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
