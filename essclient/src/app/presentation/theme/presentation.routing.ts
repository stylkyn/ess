import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { MetaGuard, MetaModule, MetaConfig } from 'ng2-meta';


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
                loadChildren: './../pages/homepage/homepage.module#HomepageModule',
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Homepage',
                        keywords: 'Software development, vyvoj softwaru'
                    }
                }
            },
        ]
    }
];

export const metaConf = metaConfig;
export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);

// import { ThemeComponent } from './theme.component';
// import { RouterModule, Routes } from '@angular/router';
// import { NgModule } from '@angular/core';
// import { MetaGuard, MetaModule, MetaConfig } from 'ng2-meta';



// // defaultni data pro meta tagy
// const metaConfig: MetaConfig = {
//     useTitleSuffix: true,
//     defaults: {
//         description: 'Elitec software zpracovani internich systemu na zakazku',
//         // 'og:image': 'assets/img/embroidery-broderie-website.png',
//         author: 'elitecsoftware.cz'
//     }
//   };

// @NgModule({
//     imports: [
//         RouterModule.forRoot(APP_ROUTES, {useHash: true}),
//         MetaModule.forRoot(metaConfig),
//     ],
//     exports: [ ],
// })

// export class PresentationRouterModule {}

