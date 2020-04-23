import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/API/user.service';
import { adminLoginFullRoute, adminDashFullRoute } from './admin-routes';
import { IUser } from 'src/app/models/IUser';

@Component({
    selector: 'app-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
    adminDashFullRoute = adminDashFullRoute;

    public get getUser(): IUser {
        return this._userService.user;
    }

    constructor (
        private _router: Router,
        private _userService: UserService
    ) {
    }

    ngOnInit() {
    }

    public goTo(fullUrl: string) {
        this._router.navigateByUrl(fullUrl);
    }

    public logOut() {
        this._userService.logout();
        console.log(adminLoginFullRoute);
        this._router.navigateByUrl(adminLoginFullRoute);
    }
}
