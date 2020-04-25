import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { ICategory, initCategory } from 'src/app/models/ICategory';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';


export interface ICategoryRequest {
  UrlName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends APIRepository<ICategory> {

  public activeCategory: ICategory = initCategory;
  public categoriesTree: ICategory[] = [];

  constructor(public _API: APIService, private _route: ActivatedRoute) {
    super(_API, 'categories');
  }

  public async fetchTree(): Promise<ICategory[]> {
    if (this.categoriesTree.length === 0) {
      return this._API.get(`${this.className}/GetTree`).pipe(
        map((categories: ICategory[]) => {
          this.categoriesTree = categories;
          return categories;
      })).toPromise();
    }
    return new Promise((resolve) => resolve(this.categoriesTree));
  }


  public fetchActiveCategory(request: ICategoryRequest): Promise<ICategory>{
    return this._API.getQuery<ICategory>(`${this.className}/GetByUrl`, request).pipe(
        map((category: ICategory) => {
          this.activeCategory = category;
          return category;
        })
    ).toPromise();
  }
}
