import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdprComponent } from './gdpr.component';
import { routing } from './gdpr.routing';
import { IconsModule } from 'ng-uikit-pro-standard';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    routing
  ],
  declarations: [GdprComponent]
})
export class GdprModule { }
