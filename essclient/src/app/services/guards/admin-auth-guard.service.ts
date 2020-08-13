import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, CanActivateChild } from '@angular/router';
import { UserService } from 'src/app/services/API/user.service';
import { adminLoginFullRoute } from '../../internal/theme/admin-routes';

@Injectable()
export class AdminAuthGuardService implements CanActivate, CanActivateChild {

    constructor (private _userService: UserService, private _router: Router) { }

    canActivateChild(): Promise<boolean | UrlTree> | boolean {
        return this.verifyAccess();
    }

    canActivate(): Promise<UrlTree | boolean> | boolean  {
        return this.verifyAccess();
    }

    private verifyAccess(): Promise<boolean | UrlTree> | boolean {
        if (this._userService.user?.hasAdminAccess)
            return true;

        return new Promise((resolve) => {
            this._userService.getIsLoadedPromise.then(user => {
                if (!user?.hasAdminAccess)
                    resolve(this._router.parseUrl(adminLoginFullRoute));
                resolve(true);
            }).catch(x => resolve(this._router.parseUrl(adminLoginFullRoute)));
        });
    }
}
