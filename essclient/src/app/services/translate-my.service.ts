import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface IOption {
  value: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})

export class TranslateMyService {

  constructor (public _translate: TranslateService) {
  }

  public configTranslator(): void {
    this._translate.addLangs(['cs', 'en']);
    this._translate.setDefaultLang('cs');

    const browserLang = this._translate.getBrowserLang();
    this._translate.use(browserLang.match(/en|cs/) ? browserLang : 'cs');
  }

  public get currentLang(): string {
    return this._translate.currentLang;
  }

  public getLangs(): IOption[] {
    return this._translate.getLangs().map(x => {
      return {value: x, label: x};
    });
  }

  public use(lang: IOption): void {
    this._translate.use(lang.value);
  }
}
