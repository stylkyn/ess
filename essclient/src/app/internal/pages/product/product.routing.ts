import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ProductComponent } from './product.component';

const APP_ROUTES: Routes = [
    { path: '', component: ProductComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
