import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

  public langs: any[];
  public selected: string;

  constructor() {
  }

  ngOnInit() {
    console.log(this.selected);
  }

}
