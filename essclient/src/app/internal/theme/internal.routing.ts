import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { adminTaskRoute, adminDashRoute, adminLoginRoute, adminUserRoute } from './admin-routes';
import { AdminAuthGuardService } from '../../services/guards/admin-auth-guard.service';
import { AdminAuthExistGuardService } from './../../services/guards/admin-auth-exist-guard.service';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: ThemeComponent,
        canActivate: [AdminAuthGuardService],
        canActivateChild: [AdminAuthGuardService],
        children: [
            { path: adminDashRoute, loadChildren: () => import('./../pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: adminTaskRoute, loadChildren: () => import('./../pages/task/task.module').then(m => m.TaskModule) },
            { path: adminUserRoute, loadChildren: () => import('./../pages/user/user.module').then(m => m.UserModule) },
        ]
    },
    {
        path: adminLoginRoute,
        canActivate: [AdminAuthExistGuardService],
        loadChildren: () => import('./../pages/login/login.module').then(m => m.LoginModule)
    },

];


export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
