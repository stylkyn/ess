import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const APP_ROUTES: Routes = [
    { path: '', loadChildren: () => import('./presentation/theme/theme.module').then(mod => mod.ThemeModule)}
    // { path: '', loadChildren: './presentation/theme/theme.module#ThemeModule'},
    // { path: 'administration', loadChildren: './internal/theme/theme.module#ThemeModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES, {useHash: false}),
    ],
    exports: [ RouterModule ],
})

export class AppRoutingModule {}

