import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { GdprComponent } from './gdpr.component';

const APP_ROUTES: Routes = [
    { path: '', component: GdprComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
