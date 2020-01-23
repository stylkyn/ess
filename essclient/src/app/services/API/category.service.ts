import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable, EventEmitter } from '@angular/core';
import { ICategory } from 'src/app/models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends APIRepository<ICategory> {

  // public readonly categoriesTree: EventEmitter<ICategory[]> = new EventEmitter<ICategory[]>();
  public categoriesTree: ICategory[];

  constructor(public _API: APIService) {
    super(_API, 'categories');
  }

  public getTree(): void {
    if (!this.categoriesTree) {
      this._API.get(`${this.className}/GetTree`).subscribe(x => this.categoriesTree = x);
    }
  }
}
