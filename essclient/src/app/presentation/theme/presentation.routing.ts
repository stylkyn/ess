import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { MetaGuard, MetaConfig } from 'ng2-meta';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { presentationProductRoute, presentationOrderRoute, presentationOrderSummaryRoute, presentationHomepage, presentationMyAccountRoute, presentationAgentRoute, presentationContactRoute, presentationAboutUsRoute, presentationGdprRoute, presentationTermsRoute } from './presentation-routes';

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
    { path: '', pathMatch: 'full', redirectTo: presentationHomepage },
    { path: '', component: ThemeComponent, children: [
        {
            path: presentationHomepage,
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
            path: presentationProductRoute,
            loadChildren: () => import('./../pages/eshop/eshop.module').then(mod => mod.EshopModule)
        },
        {
            path: presentationOrderRoute,
            loadChildren: () => import('./../pages/order/order.module').then(mod => mod.OrderModule)
        },
        {
            path: presentationOrderSummaryRoute,
            loadChildren: () => import('./../pages/order-summary/order-summary.module').then(mod => mod.OrderSummaryModule)
        },
        {
            path: presentationMyAccountRoute,
            loadChildren: () => import('./../pages/my-account/my-account.module').then(mod => mod.MyAccountModule)
        },
        {
            path: presentationAgentRoute,
            loadChildren: () => import('./../pages/agent/agent.module').then(mod => mod.AgentModule)
        },
        {
            path: presentationContactRoute,
            loadChildren: () => import('./../pages/contact/contact.module').then(mod => mod.ContactModule)
        },
        {
            path: presentationAboutUsRoute,
            loadChildren: () => import('./../pages/about-us/about-us.module').then(mod => mod.AboutUsModule)
        },
        {
            path: presentationTermsRoute,
            loadChildren: () => import('./../pages/terms/terms.module').then(mod => mod.TermsModule)
        },
        {
            path: presentationGdprRoute,
            loadChildren: () => import('./../pages/gdpr/gdpr.module').then(mod => mod.GdprModule)
        },
    ]}
];

export const metaConf = metaConfig;
export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
