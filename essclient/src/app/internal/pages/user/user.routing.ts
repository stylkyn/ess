import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UserComponent } from './user.component';

const APP_ROUTES: Routes = [
    { path: '', component: UserComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
