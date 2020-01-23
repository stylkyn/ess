import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../../services/API/category.service';
import { ICategory } from './../../../models/ICategory';

@Component({
  selector: 'app-shop-menu',
  templateUrl: './shop-menu.component.html',
  styleUrls: []
})
export class ShopMenuComponent implements OnInit {

  constructor(public categoryService: CategoryService ) { }

  ngOnInit() {
    this.categoryService.getTree();
  }

}
