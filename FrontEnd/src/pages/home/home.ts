import { Component } from "@angular/core";
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { AddUsuarioPage } from '../add-usuario-page/add-usuario-page';
import { Garages } from '../../providers/garages';
 
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
	garages: any;
 
	constructor(public nav: NavController, public garageService: Garages, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
	}
 
 	//Show loading...
	loading(){
		let loader = this.loadingCtrl.create({
			content: "Espere por favor...",
			duration: 2000
		});

		loader.present();
	}
 
	ionViewDidLoad(){
		/*
		this.garageService.getGarages().then((data) => {
		  console.log(data);
		  this.garages = data;
		});
		*/
		
		//Show "Espere por favor"
		this.loading();
		
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