import { Component, OnInit } from '@angular/core';
import { ProductsService, IProductSearchRequest } from './../../../../services/API/products.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService, ICategoryRequest } from './../../../../services/API/category.service';
import { MapPriceTypes } from 'src/app/models/IPrice';

@Component({
  selector: 'app-eshop-products',
  templateUrl: './eshop-products.component.html',
  styleUrls: []
})
export class EshopProductsComponent implements OnInit {
  public mapPriceTypes = MapPriceTypes;

  constructor(
    public _categoryService: CategoryService,
    public _productService: ProductsService,
    private _route: ActivatedRoute) {
      this._route.url.subscribe(() => {
        const urlName = this._route.snapshot.paramMap.get('categoryUrlName');

        this.setActiveCategory(urlName);
        this.loadProducts(urlName);
      });
  }

  ngOnInit() {
  }

  setActiveCategory(urlName: string) {
    if (!urlName) return;

    const request: ICategoryRequest = {
      UrlName: urlName
    };
    this._categoryService.fetchActiveCategory(request);
  }

  loadProducts (categoryUrlName: string) {
    const request: IProductSearchRequest = {
      categoryUrlName: categoryUrlName
    };
    this._productService.search(request);
  }

}
