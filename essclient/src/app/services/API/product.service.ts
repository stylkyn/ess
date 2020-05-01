import { APIService, IResponse } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { IProduct, initProduct } from 'src/app/models/IProduct';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface IProductSearchRequest {
    categoryId?: string;
    categoryUrlName?: string;

    fullText: string;
    pageSize: number;
    pageNumber: number;
}

export interface IProductByUrlRequest {
    urlName: string;
}

export interface IProductCreateRequest {
}

export interface IProductUpdateRequest {
}

@Injectable({
  providedIn: 'root'
})

export class ProductService extends APIRepository<IProduct> {
    products: IProduct[];
    activeProduct: IProduct = initProduct;

    constructor(public _API: APIService) {
        super(_API, 'Products');
    }

    public search(request: IProductSearchRequest): Observable<IResponse<IProduct[]>> {
        return this._API.getQueryTotal<IProduct[]>(`${this.className}/SearchExtend`, request);
    }

    public fetchProductByUrl(request: IProductByUrlRequest): Promise<IProduct> {
        return this._API.getQuery(`${this.className}/GetByUrl`, request).pipe(
            map((product: IProduct) => {
            this.activeProduct = product;
            return product;
            })
        ).toPromise();
    }

    public add(request: IProductCreateRequest): Observable<IProduct> {
        return this._API.post(`${this.className}/Add`, request);
    }

    public update(request: IProductUpdateRequest): Observable<IProduct> {
        return this._API.put(`${this.className}/Update`, request);
    }

    public delete(id: string): Observable<any> {
        return this._API.delete<any>(`${this.className}/Delete?Id=${id}`);
    }
}
