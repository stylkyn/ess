import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule} from '@ngx-translate/core';
import { SelectModule, InputsModule, WavesModule, ButtonsModule } from 'ng-uikit-pro-standard';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // PLUGINY
    TranslateModule,
    // mdb
    InputsModule,
    SelectModule,
    ButtonsModule,
    WavesModule,
  ],
  declarations: [
    SelectLanguageComponent
  ],
  exports: [
    TranslateModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputsModule,
    SelectModule,
    ButtonsModule,
    SelectLanguageComponent,
    WavesModule
  ]
})
export class SharedModule { }
