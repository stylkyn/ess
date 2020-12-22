import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TermsComponent } from './terms.component';

const APP_ROUTES: Routes = [
    { path: '', component: TermsComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
