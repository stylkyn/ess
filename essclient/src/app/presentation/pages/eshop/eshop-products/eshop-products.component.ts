import { Component, OnInit } from '@angular/core';
import { ProductsService, IProductSearchRequest } from './../../../../services/API/products.service';
import { IProduct } from 'src/app/models/IProduct';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eshop-products',
  templateUrl: './eshop-products.component.html',
  styleUrls: []
})
export class EshopProductsComponent implements OnInit {

  constructor(public _productService: ProductsService, private _route: ActivatedRoute) {

  }

  loadProducts () {
    const request: IProductSearchRequest = {
      categoryName: this._route.snapshot.paramMap.get('categoryName')
    };
    this._productService.search(request);
  }

  ngOnInit() {
    this.loadProducts();
  }

}
