import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { email } from '@ng-validators/ng-validators';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

    constructor(private facebookService: FacebookService) { }

    ngOnInit(): void {
        // this.initFacebookService();
    }

    // private initFacebookService(): void {
    //     const initParams: InitParams = { xfbml: true, version: 'v3.3', appId: '361664051240704' };
    //     this.facebookService.init(initParams)
    //         .then(a => 
    //             this.facebookService.login({  })
    //                 .then((response: LoginResponse) => console.log(response))
    //                 .catch((error: any) => console.error(error))
                
    //             )
    //         .catch(e => console.log(e));

    //     console.log(this.facebookService.getAuthResponse());

    //     this.facebookService.getLoginStatus()
    //         .then(a => console.log(a))
    //         .catch(c => console.log(c));
    // }

}
