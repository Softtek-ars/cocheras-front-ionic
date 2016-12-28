import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { Platform, NavController, AlertController } from 'ionic-angular';

import { LoginProvider } from '../../providers/login-provider';
import { TabsPage } from '../../pages/tabs/tabs';

@Component({
    templateUrl: 'login.html',
    providers: [LoginProvider]
})
export class LoginPage {
	private userName: string;
	private password: string;
	
	constructor(public nav: NavController, public platform: Platform, public http: Http, public loginProvider: LoginProvider, public alertCtrl: AlertController) {
	}
	
	login() {
		this.loginProvider.login(this.userName, this.password).subscribe(
			data => {
				//Navigate to Tabs Page
				this.nav.push(TabsPage, { userName: data.username, authorization: data.token });
            },
			err => {
				console.log(err);			
				this.showIncorrectLogin();
            },
			() => console.log('Login complete')
		);
    }
	
	// End App
	exitApp() {
		this.showConfirmExit();
	}

	// Alert
	showIncorrectLogin() {
		let alert = this.alertCtrl.create({
		  title: 'Inicion de sesion',
		  message: 'Las credenciales ingresadas no son validas',
		  buttons: ['Aceptar']
		});
		
		alert.present();
	}
	
	// Confirm alert
	showConfirmExit() {
		let confirm = this.alertCtrl.create({
		  title: 'Confirmacion',
		  message: '¿Esta seguro que desea salir del sistema?',
		  buttons: [
			{
			  text: 'Salir',
			  handler: () => {
				this.platform.exitApp();
			  }
			},
			{
			  text: 'Cancelar',
			  handler: () => {
				return;
			  }
			}
		  ]
		});
		
		confirm.present();
	}
}