import { Component, ViewChild } from '@angular/core';
import {  Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Search, Page2} from '../pages/pages';
import { CoffeeHouseApi } from '../services/services';


@Component({
  templateUrl: 'app.html',
  providers:[
    CoffeeHouseApi
  ]

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Search;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Search', component: Search },
      { title: 'Page Two', component: Page2 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
