import { LoaderService } from './services/loader.service';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/API/user.service';
import { ActivatedRoute } from '@angular/router';
import { NzI18nService, en_GB } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    showLoader = false;

    constructor (
        private _mdbSpinningPreloader: MDBSpinningPreloader,
        private _loaderSrv: LoaderService,
        private i18n: NzI18nService,
        private _userSrv: UserService,
        private route: ActivatedRoute
        ) {
        this.i18n.setLocale(en_GB);
        this._mdbSpinningPreloader.stop();
        this._loaderSrv.loaderEmmitter.subscribe((show: boolean) => this.showLoader = show);
    }
}
