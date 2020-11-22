import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/API/user.service';
import { adminLoginFullRoute, adminUserRoute, adminDashRoute, adminCategoryRoute, adminProductRoute, adminOrderRoute, adminSettingsRoute, adminTransportRoute } from './admin-routes';
import { IUser } from 'src/app/models/IUser';
import { adminPaymentRoute } from './admin-routes copy';

@Component({
    selector: 'app-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
    adminUserRoute = adminUserRoute;
    adminDashRoute = adminDashRoute;
    adminCategoryRoute = adminCategoryRoute;
    adminProductRoute = adminProductRoute;
    adminOrderRoute = adminOrderRoute;
    adminSettingsRoute = adminSettingsRoute;
    adminTransportRoute = adminTransportRoute;
    adminPaymentRoute = adminPaymentRoute;

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

    public logOut() {
        this._userService.logout();
        this._router.navigateByUrl(adminLoginFullRoute);
    }
}
