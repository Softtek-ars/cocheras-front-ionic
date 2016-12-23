import { Component } from "@angular/core";
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Garages } from '../../providers/garages';

import { LoginSharedService } from '../../services/login-service';
 
@Component({
  selector: 'cocheras-page',
  templateUrl: 'cocheras.html',
  providers: [LoginSharedService]
})
export class CocherasPage {
	garages: any;
	usuario: string;
	fecha: Date;
 
	constructor(public nav: NavController, public garageService: Garages, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public loginSharedservice: LoginSharedService) {
		this.usuario = this.loginSharedservice.getUserName();
		this.usuario = 'Emiliano Dato';
		this.fecha = new Date();
	}
 
	ionViewDidLoad(){
		this.getGarages();
	}
	
	ionViewWillLeave() {
		this.getGarages();
	}
	
	getGarages(){
		this.garageService.getGarages().subscribe(
			data => {
				console.log(data);
				this.garages = data;
            },
			err => {
				console.log(err);
            },
			() => console.log('getGarages complete')
		);
	}
}