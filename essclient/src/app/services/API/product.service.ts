import { APIService, IResponse } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { IProduct, initProduct, ProductType } from 'src/app/models/IProduct';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IImage } from 'src/app/models/IImage';

export interface IProductSearchExtendRequest {
    categoryId?: string;
    categoryUrlName?: string;
    productType?: ProductType;

    fullText: string;
    pageSize: number;
    pageNumber: number;
}

export interface IProductSearchRequest {
    categoryId?: string;
    categoryUrlName?: string;
}

export interface IProductByUrlRequest {
    urlName: string;
}

export interface IProductCreateRequest extends IProductSetRequest{
}

export interface IProductUpdateRequest extends IProductSetRequest {
    id: string;
}

export interface IProductSetRequest {
    name: string;
    urlName: string;
    previewName: string;
    image: IImage;
    gallery: IImage[];
    categoryId: string;
    description: string;
    previewDescription: string;
    type: ProductType;
    buy: BuyRequest;
    service: ServiceRequest;
    deposit: DepositRequest;
    stock: StockRequest;
}
export interface StockRequest {
    count: number;
    preOrderDays: number;
}
export interface ServiceRequest {
    priceWithoutVat: number;
}
export interface DepositRequest {
    priceWithoutVat: number;
    depositValue: number;
}
export interface BuyRequest {
    priceWithoutVat: number;
}


@Injectable({
    providedIn: 'root'
})

export class ProductService extends APIRepository<IProduct> {
    activeProduct: IProduct = initProduct;

    constructor (public _API: APIService) {
        super(_API, 'Products');
    }

    public search(request: IProductSearchRequest): Observable<IResponse<IProduct[]>> {
        return this._API.getQueryTotal<IProduct[]>(`${this.className}/Search`, request);
    }

    public searchExtend(request: IProductSearchExtendRequest): Observable<IResponse<IProduct[]>> {
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
