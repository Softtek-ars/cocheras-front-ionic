import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the Index page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
		let loginModal = this.modalCtrl.create(LoginPage);
		loginModal.present();
	}
}
