import { LoaderService } from './services/loader.service';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/API/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showLoader = false;

  constructor (
      private _mdbSpinningPreloader: MDBSpinningPreloader,
      private _loaderSrv: LoaderService,
      private _userService: UserService
      ) {
    this._mdbSpinningPreloader.stop();
    this._loaderSrv.loaderEmmitter
      .subscribe((show: boolean) => this.showLoader = show);
  }

  ngOnInit(): void {
      this._userService.authentificationJwt().subscribe();
  }
}
