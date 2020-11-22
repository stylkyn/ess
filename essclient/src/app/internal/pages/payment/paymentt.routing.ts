import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PaymentComponent } from './payment.component';

const APP_ROUTES: Routes = [
    { path: '', component: PaymentComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
