import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AboutUsComponent } from './about-us.component';

const APP_ROUTES: Routes = [
    { path: '', component: AboutUsComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
