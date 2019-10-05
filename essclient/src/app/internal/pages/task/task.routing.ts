import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TaskComponent } from './task.component';

const APP_ROUTES: Routes = [
    { path: '', component: TaskComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
