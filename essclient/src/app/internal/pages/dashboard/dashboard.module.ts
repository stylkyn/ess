import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { routing } from './dashboard.routing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { StatsComponent } from './stats/stats.component';
import { ChartsModule, ChartSimpleModule, WavesModule } from 'ng-uikit-pro-standard';

@NgModule({
    imports: [
        CommonModule,
        routing,
        // plugins
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        ChartsModule,
        ChartSimpleModule,
        WavesModule
    ],
    declarations: [
        DashboardComponent,
        StatsComponent
    ]
})
export class DashboardModule { }
