import { Component } from '@angular/core';

import { AlertController, NavController, NavParams, LoadingController  } from 'ionic-angular';
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
  private selectedItem: any;
  private alreadyPushed: boolean;

  constructor(public alertController: AlertController,
    public nav: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public coffeeHouseApi:CoffeeHouseApi) { }

ionViewDidEnter() {
    this.alreadyPushed = false;

    if(this.selectedItem) {
      this.selectedItem._setOpenAmount(0);
    }
  }

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

          window.location = `http://maps.google.com/maps?daddr=${this.location.lat},${this.location.lng}`
    });
  }

 captureSlideItem(event) {
    let percent = event.getSlidingPercent();
    if (percent > 1 && !this.alreadyPushed) {

      // Store the event to reset it later
      this.selectedItem = event;

      // Set the flag to true
      this.alreadyPushed = true;
    }
  }
}
