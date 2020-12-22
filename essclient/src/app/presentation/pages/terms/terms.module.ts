import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms.component';
import { routing } from './terms.routing';
import { IconsModule } from 'ng-uikit-pro-standard';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    routing
  ],
  declarations: [TermsComponent]
})
export class TermsModule { }
