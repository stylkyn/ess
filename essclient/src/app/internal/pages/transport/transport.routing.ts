import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TransportComponent } from './transport.component';

const APP_ROUTES: Routes = [
    { path: '', component: TransportComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
