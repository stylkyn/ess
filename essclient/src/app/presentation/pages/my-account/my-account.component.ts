import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/API/user.service';
import { presentationHomepage } from '../../theme/presentation-routes';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

    constructor(private _userService: UserService, private _router: Router) { }

    ngOnInit() {
        this._userService.getIsLoadedPromise.then(user => {
        })
        .catch(e => {
            // this._router.navigateByUrl(presentationHomepage);
        });
    }

}
