import { TranslateMyService } from '../../../services/translate-my.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

  public langs: any[];
  public selected: string;

  constructor(public _translateMy: TranslateMyService) {
    this.langs = this._translateMy.getLangs();
  }

  ngOnInit() {
    this.selected = this._translateMy.currentLang;
    console.log(this.selected);
  }

}
