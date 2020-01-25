import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/API/category.service';
import { ICategory } from '../../../../models/ICategory';

@Component({
  selector: 'app-eshop-menu',
  templateUrl: './eshop-menu.component.html',
  styleUrls: []
})
export class EshopMenuComponent implements OnInit {

  constructor(public categoryService: CategoryService ) { }

  ngOnInit() {
    this.categoryService.getTree();
  }

}
