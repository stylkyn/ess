import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/API/user.service';
import { Router } from '@angular/router';
import { presentationMyAccountFullOrderRoute, presentationAgentOrdersFullRoute, presentationContactRoute, presentationAboutUsRoute, presentationHomepage, presentationProductRoute } from '../presentation-routes';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    presentationMyAccountFullOrderRoute = presentationMyAccountFullOrderRoute;
    presentationAgentOrdersFullRoute = presentationAgentOrdersFullRoute;
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

    ngOnInit() {
        
    }

    showRegister() {
        console.log('bbb');
    }
}
