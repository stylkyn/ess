import { APIService, IResponse } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ICategory, initCategory } from 'src/app/models/ICategory';
import { IImage } from './../../models/IImage';

interface ICategorySetRequest {
    id?: string;
    name: string;
    isActive: boolean;
    image: IImage;
    urlName: string;
    parentCategoryId?: string;
}

export interface ICategoryCreateRequest extends ICategorySetRequest{
}

export interface ICategoryUpdateRequest extends ICategorySetRequest{
}

export interface ISearchCategoryRequest {
    fullText: string;
    pageSize: number;
    pageNumber: number;
}

export interface ICategoryRequest {
    UrlName: string;
}

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends APIRepository<ICategory> {

    public activeCategory: ICategory = initCategory;
    public categoriesTree: ICategory[] = [];
    public categories: ICategory[] = [];

    public isGetAllLoading = false;

    constructor (public _API: APIService, private _route: ActivatedRoute) {
        super(_API, 'categories');
    }

    public async fetchTree(): Promise<ICategory[]> {
        if (this.categoriesTree.length === 0)
        {
            return this._API.get(`${this.className}/GetTree`).pipe(
                map((categories: ICategory[]) => {
                    this.categoriesTree = categories;
                    return categories;
                })).toPromise();
        }
        return new Promise((resolve) => resolve(this.categoriesTree));
    }

    public fetchActiveCategory(request: ICategoryRequest): Promise<ICategory> {
        return this._API.getQuery<ICategory>(`${this.className}/GetByUrl`, request).pipe(
            map((category: ICategory) => {
                this.activeCategory = category;
                return category;
            })
        ).toPromise();
    }

    public search(request: ISearchCategoryRequest): Observable<IResponse<ICategory[]>> {
        return this._API.getQueryTotal<ICategory[]>(`${this.className}/Search`, request);
    }

    public getAllOnce(): Promise<ICategory[]> {
        if (this.categories.length > 0) {
            return;
        }
        return this.getAll();
    }


    public getAll(): Promise<ICategory[]> {
        this.isGetAllLoading = true;
        const result = this._API.get<ICategory[]>(`${this.className}/GetAll`).pipe(
            map((categories: ICategory[]) => {
                this.categories = categories;
                return categories;
            })).toPromise();

        result.finally(x => {
            this.isGetAllLoading = false;
        })
        return result;
    }

    public add(request: ICategoryCreateRequest): Observable<ICategory> {
        this.categories = [];
        return this._API.post(`${this.className}/Add`, request);
    }

    public update(request: ICategoryUpdateRequest): Observable<ICategory> {
        this.categories = [];
        return this._API.put(`${this.className}/Update`, request);
    }

    public delete(id: string): Observable<any> {
        return this._API.delete<any>(`${this.className}/Delete?Id=${id}`);
    }
}
