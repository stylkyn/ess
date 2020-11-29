import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from 'ng2-meta';
import { ModuleWithProviders } from '@angular/core';
import { presentationMyAccountOrderRoute, presentationMyAccountUserProfile } from '../../theme/presentation-routes';
import { MyAccountComponent } from './my-account.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const APP_ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: presentationMyAccountOrderRoute },
    {
        path: '',
        component: MyAccountComponent,
        canActivate: [MetaGuard],
        data: {
            meta: {
                title: 'Můj účet',
                keywords: 'Můj účet'
            }
        },
        children: [
            {
                path: presentationMyAccountOrderRoute,
                component: MyOrderComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Moje objednávky',
                        keywords: 'Moje objednavky'
                    }
                }
            },
            {
                path: presentationMyAccountUserProfile,
                component: UserProfileComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Můj profil',
                        keywords: 'Muj profil'
                    }
                }
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
