import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';

import { LoginProvider } from '../../providers/login-provider';
import { TabsPage } from '../../pages/tabs/tabs';

@Component({
    templateUrl: 'login.html',
    providers: [LoginProvider]
})
export class LoginPage {
    userName: string;
    password: string;
	
    constructor(public nav: NavController, public platform: Platform, public http: Http, public loginProvider: LoginProvider, public loadingCtrl: LoadingController) {
    }
	
	//Show loading...
	loading(){
		let loader = this.loadingCtrl.create({
			content: "Espere por favor...",
			duration: 2000
		});

		loader.present();
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
	   
	   this.loading();
    }
	
	// End App
	exitApp() {
		this.platform.exitApp();
	}
}