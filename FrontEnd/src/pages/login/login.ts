import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { Platform, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { LoginProvider } from '../../providers/login-provider';
import { TabsPage } from '../../pages/tabs/tabs';

import { LoginSharedService } from '../../services/login-service';

@Component({
    templateUrl: 'login.html',
    providers: [LoginProvider, LoginSharedService]
})
export class LoginPage {
	private usuario: string;
	private password: string;
	
	constructor(public nav: NavController, public platform: Platform, public http: Http, public loginProvider: LoginProvider, public loginSharedService: LoginSharedService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
	}
	
	login() {
		this.loginProvider.login(this.usuario, this.password).subscribe(
			data => {				
				//Navigate to home page
				this.nav.setRoot(TabsPage);

				//Show wait
				this.loading();
				
				this.loginSharedService.setUserId('nicolas.fernandez');
				this.loginSharedService.setUserName('Nof');
				this.loginSharedService.setAuthorization('token.ring');
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
	
	 //Show loading...
	loading(){
		let loader = this.loadingCtrl.create({
			content: "Espere por favor...",
			spinner: 'bubbles',
			duration: 1000
		});

		loader.present();
	}
}