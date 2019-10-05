import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterCardComponent } from '../pages/login/register-card/register-card.component';
import { LoginCardComponent } from '../pages/login/login-card/login-card.component';

const APP_ROUTES: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: 'login'},
    { path: '', component: ThemeComponent, children: [
        { path: 'dash', loadChildren: './../pages/dashboard/dashboard.module#DashboardModule' },
        { path: 'task', loadChildren: './../pages/task/task.module#TaskModule' },
        // { path: 'login', component: LoginComponent }
        // { path: 'homepage', component: HomepageComponent}
    ]},
    { path: 'login', component: LoginComponent, children: [
        { path: '', component: LoginCardComponent },
        { path: 'register', component: RegisterCardComponent },
    ]},
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
