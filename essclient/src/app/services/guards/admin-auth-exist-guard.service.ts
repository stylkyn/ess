import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, UrlTree } from '@angular/router';
import { UserService } from 'src/app/services/API/user.service';
import { adminDashFullRoute } from '../../internal/theme/admin-routes';

@Injectable()
export class AdminAuthExistGuardService implements CanActivate {

    constructor (private _userService: UserService, private _router: Router) { }

    canActivate(): Promise<UrlTree | boolean> | UrlTree {
        if (this._userService.user)
            return this._router.parseUrl(adminDashFullRoute);
            
        return new Promise((resolve) => {
            if (!this._userService.getIsLoadedPromise)
                resolve(true);

            this._userService.getIsLoadedPromise?.then(user => {
                if (user?.hasAdminAccess)
                    resolve(this._router.parseUrl(adminDashFullRoute));
                resolve(true);
            }).catch(x => resolve(true));
        });
    }
}
