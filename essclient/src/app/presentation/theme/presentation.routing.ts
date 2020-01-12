import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { MetaGuard, MetaModule, MetaConfig } from 'ng2-meta';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { EshopComponent } from '../pages/eshop/eshop.component';


// defaultni data pro meta tagy
const metaConfig: MetaConfig = {
    useTitleSuffix: true,
    defaults: {
        description: 'Elitec software zpracovani internich systemu na zakazku',
        // 'og:image': 'assets/img/embroidery-broderie-website.png',
        author: 'elitecsoftware.cz'
    }
  };

const APP_ROUTES: Routes = [
    // Main tamplate
    { path: '', pathMatch: 'full', redirectTo: 'homepage'},
    { path: '', component: ThemeComponent, children: [
            {
                path: 'homepage',
                component: HomepageComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Homepage',
                        keywords: 'Software development, vyvoj softwaru'
                    }
                }
            },
            {
                path: 'eshop',
                component: EshopComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Eshop',
                        keywords: 'Elitec software eshop'
                    }
                }
            },
        ]
    }
];

export const metaConf = metaConfig;
export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
