import { Component, OnInit, Input } from '@angular/core';
import { ICategory } from 'src/app/models/ICategory';

@Component({
  selector: 'app-eshop-menu',
  templateUrl: './eshop-menu.component.html',
  styleUrls: []
})
export class EshopMenuComponent implements OnInit {

  @Input() categoriesTree: ICategory[] = [];

  constructor() { }

  ngOnInit() {
  }

}
