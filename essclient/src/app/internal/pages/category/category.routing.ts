import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CategoryComponent } from './category.component';

const APP_ROUTES: Routes = [
    { path: '', component: CategoryComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
