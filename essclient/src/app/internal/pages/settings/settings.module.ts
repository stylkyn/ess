import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { routing } from './settings.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // plugins
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // routing
    routing,
],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
