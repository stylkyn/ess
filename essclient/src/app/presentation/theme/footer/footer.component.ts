import { Component, OnInit } from '@angular/core';
import { presentationProductFullRoute, presentationMyAccountFullOrderRoute } from '../presentation-routes';
import { UserService } from './../../../services/API/user.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    presentationProductFullRoute = presentationProductFullRoute;
    presentationMyAccountFullOrderRoute = presentationMyAccountFullOrderRoute;
    
    constructor (public _userService: UserService) { }

    ngOnInit() {
    }

}
