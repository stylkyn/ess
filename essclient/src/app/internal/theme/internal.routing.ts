import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { adminTaskRoute, adminDashRoute, adminLoginRoute, adminUserRoute, adminCategoryRoute, adminProductRoute, adminOrderRoute, adminSettingsRoute, adminTransportRoute } from './admin-routes';
import { AdminAuthGuardService } from '../../services/guards/admin-auth-guard.service';
import { AdminAuthExistGuardService } from './../../services/guards/admin-auth-exist-guard.service';
import { adminPaymentRoute } from './admin-routes copy';

const APP_ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: adminLoginRoute },
    {
        path: '',
        component: ThemeComponent,
        canActivate: [AdminAuthGuardService],
        canActivateChild: [AdminAuthGuardService],
        children: [
            { path: adminDashRoute, loadChildren: () => import('./../pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: adminTaskRoute, loadChildren: () => import('./../pages/task/task.module').then(m => m.TaskModule) },
            { path: adminUserRoute, loadChildren: () => import('./../pages/user/user.module').then(m => m.UserModule) },
            { path: adminCategoryRoute, loadChildren: () => import('./../pages/category/category.module').then(m => m.CategoryModule) },
            { path: adminProductRoute, loadChildren: () => import('./../pages/product/product.module').then(m => m.ProductModule) },
            { path: adminOrderRoute, loadChildren: () => import('./../pages/order/order.module').then(m => m.OrderModule) },
            { path: adminSettingsRoute, loadChildren: () => import('./../pages/settings/settings.module').then(m => m.SettingsModule) },
            { path: adminTransportRoute, loadChildren: () => import('./../pages/transport/transport.module').then(m => m.TransportModule) },
            { path: adminPaymentRoute, loadChildren: () => import('./../pages/payment/payment.module').then(m => m.PaymentModule) },
        ]
    },
    {
        path: adminLoginRoute,
        canActivate: [AdminAuthExistGuardService],
        loadChildren: () => import('./../pages/login/login.module').then(m => m.LoginModule)
    },

];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
