import { Component } from "@angular/core";
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Garages } from '../../providers/garages';
import { AddReservaPage } from '../add-reserva/add-reserva';
import { LoginPage } from '../login/login';
 
@Component({
  selector: 'cocheras-page',
  templateUrl: 'cocheras.html'
})
export class CocherasPage {
	parameters: any;
	garages: any;
	
	userName: string;
	authorization: string;

	garageDate: Date;
 
	constructor(public nav: NavController, public params: NavParams, public garageService: Garages, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
		this.parameters = params.data;
		
		// Session credentials
		this.userName = this.parameters.userName;
		this.authorization = this.parameters.authorization;
	}
 
	addReserva(item){
		//Navigate to AddReservaPage
		this.nav.push(AddReservaPage, { userName: this.userName, authorization: this.authorization, garageDate: this.garageDate, garage: item } )
	}
	
	ionViewWillLeave() {
		if (this.garageDate){
			this.getGarages();
		}
	}
	
	getGarages(){
		//Show wait
		this.loading(0.2);
				
		this.garageService.getGarages(this.authorization, this.garageDate).subscribe(
			data => {
				this.garages = data;
            },
			err => {
				console.log(err);
				
				// No authorization
				if (err = '403'){
					this.nav.push(LoginPage)
				}
            },
			() => console.log('getGarages complete')
		);
	}
	
	refresh(item){
		
	}
	
	//Show loading...
	loading(seconds){
		let loader = this.loadingCtrl.create({
			content: "Espere por favor...",
			spinner: 'bubbles',
			duration: seconds * 1000
		});

		loader.present();
	}
}