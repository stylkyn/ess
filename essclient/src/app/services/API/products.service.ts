import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { ICategory } from 'src/app/models/ICategory';
import { Observable } from 'rxjs/internal/Observable';
import { IProduct } from 'src/app/models/IProduct';

export interface IProductSearchRequest {
  categoryId?: string;
  categoryName?: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService extends APIRepository<IProduct> {
  products: IProduct[];

  constructor(public _API: APIService) {
    super(_API, 'Products');
  }

  public search(request: IProductSearchRequest): void {
    this._API.getQuery(`${this.className}/Search`, request)
      .subscribe(x => this.products = x);
  }
}
