import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { CoffeeHouseDataService } from '../../services/services';
declare var window: any;

@Component({
  templateUrl: 'map.page.html'
})
export class MapPage {

  map: any = {};
  private location: any = {};

  constructor(public navParams: NavParams, public mapsApiService: CoffeeHouseDataService) {
  }

  ionViewDidLoad(){
    let locationAddress = this.navParams.data;
    this.mapsApiService.getGeoLocationFromAddress(locationAddress).then(data => {
      let locationData: any = data;
    this.location = locationData.results[0].geometry.location

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
