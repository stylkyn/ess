import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ContactComponent } from './contact.component';

const APP_ROUTES: Routes = [
    { path: '', component: ContactComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
