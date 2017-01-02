import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { CoffeeHouseApi } from '../../services/services';
declare var window: any;

@Component({
  templateUrl: 'map.page.html'
})
export class MapPage {

  map: any = {};
  private location: any = {};
  private locationData:any={};

  constructor(public navParams: NavParams, public coffeeHouseApi: CoffeeHouseApi) {
  }

  ionViewDidLoad(){
    let locationAddress = this.navParams.data;
    this.coffeeHouseApi.getLocationData(locationAddress).then(data => {
    this.locationData =  data;
    this.location = this.locationData.location;

      this.map = {
        lat: this.location.lat,
        lng: this.location.lng,
        zoom: 18,
        markerLabel: locationAddress
    };

    });
  }

  getDirections() {
    window.location = `http://maps.google.com/maps?daddr=${this.map.lat},${this.map.lng}`
  }

}
