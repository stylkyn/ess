import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from 'ng2-meta';
import { ModuleWithProviders } from '@angular/core';
import { OrderComponent } from './order.component';
import { OrderProductsComponent } from './order-products/order-products.component';
import { OrderTransportComponent } from './order-transport/order-transport.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { OrderCustomerComponent } from './order-customer/order-customer.component';
import { OrderFinishComponent } from './order-finish/order-finish.component';

export const orderBasketRoute = 'kosik';
export const orderTransportRoute = 'doprava';
export const orderPaymentRoute = 'platba';
export const orderCustomerRoute = 'osobni-udaje';
export const orderFinishRoute = 'dokoncena';

const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: orderBasketRoute,
        pathMatch: 'prefix',
    },
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
            },
            {
                path: orderCustomerRoute,
                component: OrderCustomerComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Osobní údaje | Elitec',
                        keywords: 'Objednávka Osobní údaje'
                    }
                }
            },
            {
                path: orderFinishRoute,
                component: OrderFinishComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Dokončená objednávka | Elitec',
                        keywords: 'Objednávka dokončená'
                    }
                }
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
