import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent.component';
import { AgentOrdersComponent } from './agent-orders/agent-orders.component';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ButtonsModule, WavesModule, IconsModule } from 'ng-uikit-pro-standard';
import { routing } from './agent.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NzTableModule,
        NzDividerModule,
        ButtonsModule,
        WavesModule,
        IconsModule,
        routing,
    ],
    declarations: [
        AgentComponent,
        AgentOrdersComponent
    ]
})
export class AgentModule { }
