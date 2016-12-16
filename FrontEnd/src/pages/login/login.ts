import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {Http} from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

import { LoginProvider } from '../../providers/login-provider';
import { TabsPage } from '../../pages/tabs/tabs';

@Component({
    templateUrl: 'login.html',
    providers: [LoginProvider]
})
export class LoginPage {
    userName: string;
    password: string;
    constructor(public nav: NavController, public platform: Platform, public http: Http, public loginProvider: LoginProvider) {
    }

    login() {
        /*this.loginProvider.login(this.userName, this.password).subscribe(
             data => {      
               //Navigate to home page              
                this.nav.setRoot(TabsPage);
             }
          )
       }*/
	   
	   this.loginProvider.login(this.userName, this.password);
	   
	   //Navigate to home page              
	   this.nav.setRoot(TabsPage);
    }
}