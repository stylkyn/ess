import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from 'ng2-meta';
import { ModuleWithProviders } from '@angular/core';
import { AgentComponent } from './agent.component';
import { AgentOrdersComponent } from './agent-orders/agent-orders.component';
import { presentationAgentOrdersRoute } from '../../theme/presentation-routes';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: AgentComponent,
        canActivate: [MetaGuard],
        data: {
            meta: {
                title: 'Agent | Elitec',
                keywords: 'Agent'
            }
        },
        children: [
            {
                path: presentationAgentOrdersRoute,
                component: AgentOrdersComponent,
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Správa servisů | Elitec',
                        keywords: 'Servis agent'
                    }
                }
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
