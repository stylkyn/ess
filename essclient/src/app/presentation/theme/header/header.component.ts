import { Component } from '@angular/core';
import { UserService } from 'src/app/services/API/user.service';
import { Router } from '@angular/router';
import { presentationMyAccountFullOrderRoute, presentationAgentOrdersFullRoute, presentationContactRoute, presentationAboutUsRoute, presentationHomepage, presentationProductRoute, presentationMyAccountFullProfileRoute } from '../presentation-routes';
import { presentationMyAccountFullChangePasswordRoute } from './../presentation-routes';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    presentationMyAccountFullOrderRoute = presentationMyAccountFullOrderRoute;
    presentationAgentOrdersFullRoute = presentationAgentOrdersFullRoute;
    presentationMyAccountFullProfileRoute = presentationMyAccountFullProfileRoute;
    presentationMyAccountFullChangePasswordRoute = presentationMyAccountFullChangePasswordRoute;
    presentationContactRoute = presentationContactRoute;
    presentationAboutUsRoute = presentationAboutUsRoute;
    presentationHomepageRoute = presentationHomepage;
    presentationProductRoute = presentationProductRoute;
    
    constructor (public userSrv: UserService, private router: Router) { }

    public onBasketClick() {
    }

    public logOut() {
        this.userSrv.logout();
        this.router.navigateByUrl('');
    }
}
