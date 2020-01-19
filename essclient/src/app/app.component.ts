import { LoaderService } from './services/loader.service';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { Component } from '@angular/core';

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
      ) {
    this._mdbSpinningPreloader.stop();
    this._loaderSrv.loaderEmmitter
      .subscribe((show: boolean) => this.showLoader = show);
  }
}
