import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const APP_ROUTES: Routes = [
    // Main tamplate
    { path: '', pathMatch: 'full', redirectTo: 'homepage'},
    { path: '', loadChildren: './presentation/theme/theme.module#ThemeModule'},
    // { path: 'administration', loadChildren: './internal/theme/theme.module#ThemeModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES, {useHash: true}),
    ],
    exports: [ RouterModule ],
})

export class AppRoutingModule {}

