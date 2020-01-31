import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { IProduct, initProduct } from 'src/app/models/IProduct';
import { map } from 'rxjs/operators';

export interface IProductSearchRequest {
  categoryId?: string;
  categoryUrlName?: string;
}

export interface IProductByUrlRequest {
  UrlName: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService extends APIRepository<IProduct> {
  products: IProduct[];
  activeProduct: IProduct = initProduct;

  constructor(public _API: APIService) {
    super(_API, 'Products');
  }

  public search(request: IProductSearchRequest): void {
    this._API.getQuery(`${this.className}/Search`, request)
      .subscribe(x => this.products = x);
  }

  public fetchCategoryByUrl(request: IProductByUrlRequest): Promise<any> {
    return this._API.getQuery(`${this.className}/GetByUrl`, request).pipe(
        map((category: IProduct) => {
          this.activeProduct = category;
          return category;
        })
    ).toPromise();
  }
}
