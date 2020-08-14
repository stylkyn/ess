import { Component, OnInit } from '@angular/core';
import { presentationProductFullRoute, presentationMyAccountFullOrderRoute, presentationContactRoute, presentationAboutUsRoute } from '../presentation-routes';
import { UserService } from './../../../services/API/user.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    presentationProductFullRoute = presentationProductFullRoute;
    presentationMyAccountFullOrderRoute = presentationMyAccountFullOrderRoute;
    presentationContactRoute = presentationContactRoute;
    presentationAboutUsRoute = presentationAboutUsRoute;
    
    constructor (public _userService: UserService) { }

    ngOnInit() {
    }

}
