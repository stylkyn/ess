import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { IconsModule } from 'ng-uikit-pro-standard';
import { routing } from './contact.routing';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    routing
],
  declarations: [ContactComponent]
})
export class ContactModule { }
