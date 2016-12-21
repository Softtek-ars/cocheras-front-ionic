import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { Platform, NavController, NavParams } from 'ionic-angular';

import { LoginProvider } from '../../providers/login-provider';
import { TabsPage } from '../../pages/tabs/tabs';

@Component({
    templateUrl: 'login.html',
    providers: [LoginProvider]
})
export class LoginPage {
	private usuario: string;
	private password: string;
	
	constructor(public nav: NavController, public platform: Platform, public http: Http, public loginProvider: LoginProvider) {
    }
	
	login() {
		this.loginProvider.login(this.usuario, this.password).subscribe(
			data => {
				//Navigate to home page
				this.nav.setRoot(TabsPage);
            },
			err => {
				console.log(err);
            },
			() => console.log('Login complete')
		);
    }
	
	// End App
	exitApp() {
		this.platform.exitApp();
	}
}