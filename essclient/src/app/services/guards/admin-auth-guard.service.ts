import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, CanActivateChild } from '@angular/router';
import { UserService } from 'src/app/services/API/user.service';
import { adminLoginFullRoute } from '../../internal/theme/admin-routes';

@Injectable()
export class AdminAuthGuardService implements CanActivate, CanActivateChild {

    constructor (private _userService: UserService, private _router: Router) { }

    canActivateChild(): Promise<boolean | UrlTree> {
        return this.verifyAccess();
    }


    canActivate(): Promise<UrlTree | boolean> {
        return this.verifyAccess();
    }

    private verifyAccess(): Promise<boolean | UrlTree> {
        return new Promise((resolve) => {
            this._userService.getIsLoadedPromise.then(user => {
                console.log(user);
                if (!user?.hasAdminAccess)
                    resolve(this._router.parseUrl(adminLoginFullRoute));
                resolve(true);
            }).catch(x => resolve(false));
        });
    }
}
