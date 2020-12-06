import { LoaderService } from './services/loader.service';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/API/user.service';
import { ActivatedRoute } from '@angular/router';

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
        private _userSrv: UserService,
        private route: ActivatedRoute
        ) {
        this._mdbSpinningPreloader.stop();
        this._loaderSrv.loaderEmmitter
        .subscribe((show: boolean) => this.showLoader = show);
    }

    ngOnInit(): void {
        // this.route.queryParams.subscribe(params => {
        //     console.log(params);
        //     console.log(params['jwt']);
        //     this._userSrv.setTokenFromUrl(params['jwt'], params['expiresDate']);
        // });
    }
}
