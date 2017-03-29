import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';


import { LoadingController, NavController, ModalController, AlertController } from 'ionic-angular';
import { CoffeeHouseDataService } from '../../services/services';
import { MapPage } from '../pages';

declare var window: any;
declare var google: any;

@Component({
  selector: 'page-search',
  templateUrl: 'search.page.html'
})
export class Search {
  address: any = {
    place: '',
    set: false,
  };
  searchResults: any;
range: Array<Number>;

 constructor(
    public loadingController: LoadingController,
    public nav: NavController,
    public mapsApiService: CoffeeHouseDataService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    this.searchForCoffeeHousesCurrentLocation();
  }


  searchForCoffeeHouses() {
    if (!this.address.place) {
      let alert = this.alertCtrl.create({
        title: 'Search Address',
        subTitle: 'Please enter an address to search!',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      let loader = this.loadingController.create({
        content: 'Searching...'
      });
      loader.present().then(() => {
        this.mapsApiService.getGeoLocationFromAddress(this.address.place).then(resp => {
          let response: any = resp;
          let locationData: any = response.results[0].geometry.location.lat + ',' + response.results[0].geometry.location.lng;
          this.getPlacesByGeoLocation(locationData, loader);
        });
      });
    }

  }

  goToMap(formatedAddress) {
    this.nav.push(MapPage, formatedAddress);
  }

  goToDirections(formatedAddress) {
    this.mapsApiService.getGeoLocationFromAddress(formatedAddress).then(data => {
      let response: any = data;
      let location: any = response.results[0].geometry.location;

      window.location = `http://maps.google.com/maps?daddr=${location.lat},${location.lng}`
    });
  }

  getPlacesByGeoLocation(locationData, loader) {
    this.mapsApiService.getPlacesByGeoLocation(locationData).then(data => {
      let response: any = data;
      this.searchResults = response.results;
      loader.dismiss();
    });
  }

  searchForCoffeeHousesCurrentLocation() {
    this.address.place = "";
    let loader = this.loadingController.create({
      content: 'Getting Geolocation...'
    });
    loader.present().then(() => {
      let options = { timeout: 1000, enableHighAccuracy: true };
      Geolocation.getCurrentPosition(options).then((resp) => {
        loader.setContent('Searching Location......')
        this.getPlacesByGeoLocation(resp.coords.latitude + ',' + resp.coords.longitude, loader);
      }).catch((error) => {
        loader.dismiss();
        console.log('Error getting location', error);
      });
    });
  }
}
