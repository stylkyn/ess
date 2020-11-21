import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SettingsComponent } from './settings.component';

const APP_ROUTES: Routes = [
    { path: '', component: SettingsComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
