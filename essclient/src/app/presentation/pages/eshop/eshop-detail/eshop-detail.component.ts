import { Component, OnInit } from '@angular/core';
import { ProductsService, IProductByUrlRequest } from 'src/app/services/API/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eshop-detail',
  templateUrl: './eshop-detail.component.html',
  styleUrls: ['./eshop-detail.component.css']
})
export class EshopDetailComponent implements OnInit {

  public get _activeProduct () {
    return this._productService.activeProduct;
  }

  constructor(public _productService: ProductsService, private _route: ActivatedRoute) {
    this._route.url.subscribe(() => {
      const urlName = this._route.snapshot.paramMap.get('productUrlName');

      this.loadActiveProduct(urlName);
    });
  }

  ngOnInit() {
  }

  loadActiveProduct (urlName: string) {
    const request: IProductByUrlRequest = {
      UrlName: urlName
    };
    this._productService.fetchCategoryByUrl(request);
  }

}
