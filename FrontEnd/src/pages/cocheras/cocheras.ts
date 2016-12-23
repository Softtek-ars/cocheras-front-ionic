import { Component } from "@angular/core";
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Garages } from '../../providers/garages';
import { AddReservaPage } from '../add-reserva/add-reserva';

import { LoginSharedService } from '../../services/login-service';
 
@Component({
  selector: 'cocheras-page',
  templateUrl: 'cocheras.html',
  providers: [LoginSharedService]
})
export class CocherasPage {
	garages: any;
	userName: string;
	fecha: Date;
 
	constructor(public nav: NavController, public garageService: Garages, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public loginSharedservice: LoginSharedService, public params: NavParams) {
		this.userName = params.get('userName');
		this.fecha = new Date();
	}
 
	addReserva(){
		//Navigate to AddReservaPage
		this.nav.push(AddReservaPage)
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