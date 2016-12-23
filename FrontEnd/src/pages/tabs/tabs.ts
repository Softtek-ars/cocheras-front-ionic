import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { CocherasPage } from '../cocheras/cocheras';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  userName: string;
  
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = CocherasPage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;

  constructor(public params: NavParams) {
	this.userName = params.data;
  }
}