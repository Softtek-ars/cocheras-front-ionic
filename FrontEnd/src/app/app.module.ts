import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { CocherasPage } from '../pages/cocheras/cocheras';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { IndexPage } from '../pages/index/index';

import { Garages } from '../providers/garages';
import { LoginSharedService } from '../services/login-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    CocherasPage,
    TabsPage,
	LoginPage,
	IndexPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    CocherasPage,
    TabsPage,
	LoginPage,
	IndexPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Garages, LoginSharedService]
})
export class AppModule {}
