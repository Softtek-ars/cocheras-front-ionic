import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AddReserva page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-reserva',
  templateUrl: 'add-reserva.html'
})
export class AddReservaPage {
	parameters: any;
	
	userName: string;
	authorization: string;
	
	garageDate: Date;
	garage: any;
	
	constructor(public navCtrl: NavController, public navParams: NavParams){
		this.parameters = navParams.data;
		
		this.userName = this.parameters.userName;
		this.authorization = this.parameters.authorization;
		
		this.garageDate = this.parameters.garageDate;
		this.garage = this.parameters.garage;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddReservaPage');
	}
}
