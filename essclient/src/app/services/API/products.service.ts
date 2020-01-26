import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';

export interface IProductSearchRequest {
  categoryId?: string;
  categoryUrlName?: string;
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
