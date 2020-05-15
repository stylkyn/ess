import { APIService } from './API.service';

export class APIRepository<T> {

  protected className: string;

  // Internal SET
  protected setClassName(className: string) {
    this.className = className;
  }

  constructor(protected _API: APIService, _className: string) {
    this.className = _className;
  }
}
