import { Component, OnInit } from '@angular/core';
import { presentationProductFullRoute } from '../../theme/presentation-routes';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
    presentationProductFullRoute = presentationProductFullRoute;

    constructor () { }

    ngOnInit() {
    }

}
