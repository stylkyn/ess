import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { OrderComponent } from './order.component';

const APP_ROUTES: Routes = [
    { path: '', component: OrderComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
