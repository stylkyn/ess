import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard.component';

const APP_ROUTES: Routes = [
    { path: '', component: DashboardComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
