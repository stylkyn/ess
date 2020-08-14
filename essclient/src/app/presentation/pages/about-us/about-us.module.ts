import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { routing } from './about-us.routing';
import { IconsModule } from 'ng-uikit-pro-standard';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    routing
  ],
  declarations: [AboutUsComponent]
})
export class AboutUsModule { }
