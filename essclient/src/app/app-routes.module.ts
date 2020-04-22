import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { adminBaseRoute } from './internal/theme/admin-routes';


const APP_ROUTES: Routes = [
    { path: '', loadChildren: () => import('./presentation/theme/theme.module').then(mod => mod.ThemeModule)},
    { path: adminBaseRoute, loadChildren: () => import('./internal/theme/theme.module').then(mod => mod.ThemeModule)}
    // { path: '', loadChildren: './presentation/theme/theme.module#ThemeModule'},
    // { path: 'administration', loadChildren: './internal/theme/theme.module#ThemeModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES, { useHash: false, initialNavigation: 'enabled' }),
    ],
    exports: [ RouterModule ],
})

export class AppRoutingModule {}

