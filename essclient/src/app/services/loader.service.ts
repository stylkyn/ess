import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loader: EventEmitter<boolean> = new EventEmitter();

  public get loaderEmmitter(): EventEmitter<boolean> {
    return this._loader;
  }

  constructor() { }

  public show(): void {
    this._loader.next(true);
  }

  public hide(): void {
    this._loader.next(false);
  }
}
