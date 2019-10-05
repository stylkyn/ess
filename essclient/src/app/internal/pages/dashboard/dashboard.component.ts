import { GapiService } from './../../../services/gapi.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _gapiSrv: GapiService) {
  }

  ngOnInit() {

  }

  getContacts() {
    // this._gapiSrv.getContacts()
    //   .then(data => console.log(data))
    //   .catch(e => console.warn(e));
  }

  signIn() {
    this._gapiSrv.signIn();
  }

}
