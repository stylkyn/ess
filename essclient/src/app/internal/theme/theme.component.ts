import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  constructor(
    private _router: Router,
    public _auth: AuthService
    ) {
    }

  ngOnInit() {
    console.log('internal');
  }

  public goTo(url: string) {
    console.log(url);
      this._router.navigateByUrl('administration/' + url);
  }
}
