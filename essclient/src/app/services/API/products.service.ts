import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { ICategory } from 'src/app/models/ICategory';
import { Observable } from 'rxjs/internal/Observable';

interface IProductSearchRequest {
  categoryId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends APIRepository<ICategory> {

  constructor(public _API: APIService) {
    super(_API, 'Products');
  }

  public search(request: IProductSearchRequest): Observable<ICategory[]> {
    return this._API.get(`${this.className}/Search?CategoryId=${request.categoryId}`);
  }
}
