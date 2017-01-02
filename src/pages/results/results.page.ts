import { Component } from '@angular/core';

import { AlertController, NavController, NavParams } from 'ionic-angular';
import { CoffeeHouseApi } from '../../services/services';
import { MapPage } from '../pages';

declare var window: any;

@Component({
  templateUrl: 'results.page.html'
})
export class SearchResults {
  searchResults = [];
  private location: any = {};
  private locationData:any={};

  constructor(public alertController: AlertController,
    public nav: NavController,
    public navParams: NavParams, public coffeeHouseApi:CoffeeHouseApi) { }

  ionViewDidLoad() {
    this.searchResults = this.navParams.data;
  }

  goToMap(formatedAddress){
    this.nav.push(MapPage, formatedAddress);
  }

   goToDirections(formatedAddress){
     this.coffeeHouseApi.getLocationData(formatedAddress).then(data => {
        this.locationData =  data;
        this.location = this.locationData.location;

         window.location = `geo:${this.location.lat},${this.location.lng};u=35;`;
    });

  }
}
