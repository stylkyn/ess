import { ShopMainComponent } from './../../components/shop-main/shop-main.component';
import { HomepageComponent } from './homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const APP_ROUTES: Routes = [
    { path: '', component: HomepageComponent, children: [
        // {path: '', component: ShopMainComponent}
    ] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
