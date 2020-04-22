import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginCardComponent } from './login-card/login-card.component';

const APP_ROUTES: Routes = [
    {
        path: '', component: LoginComponent, children: [
            { path: '', component: LoginCardComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
