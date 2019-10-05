import { ComponentsModule } from './../../components/components.module';
import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { routing } from './homepage.routing';
import { CarouselModule, WavesModule, InputsModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    // plugins
    CarouselModule,
    WavesModule,
    InputsModule,
    // my
    ComponentsModule
  ],
  declarations: [HomepageComponent],
  exports: [HomepageComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class HomepageModule { }
