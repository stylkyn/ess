import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from 'ng2-meta';
import { ModuleWithProviders } from '@angular/core';
import { OrderComponent } from './order.component';
import { OrderProductsComponent } from './order-products/order-products.component';
import { OrderTransportComponent } from './order-transport/order-transport.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';

export const orderRoute = 'objednavka';
export const orderBasketRoute = 'kosik';
export const orderTransportRoute = 'doprava';
export const orderPaymentRoute = 'platba';

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
                path: orderBasketRoute,
                component: OrderProductsComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Košík | Elitec',
                        keywords: 'Objednávka Košík'
                    }
                }
            },
            {
                path: orderTransportRoute,
                component: OrderTransportComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Doprava | Elitec',
                        keywords: 'Objednávka Doprava'
                    }
                }
            },
            {
                path: orderPaymentRoute,
                component: OrderPaymentComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Platba | Elitec',
                        keywords: 'Objednávka Platba'
                    }
                }
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
