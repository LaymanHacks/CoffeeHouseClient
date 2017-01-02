import { Component } from '@angular/core';

import { LoadingController, NavController } from 'ionic-angular';
import { CoffeeHouseApi } from '../../services/services';
import { SearchResults } from '../pages';

@Component({
  selector: 'page-search',
  templateUrl: 'search.page.html'
})
export class Search {
  searchLocation: any;
  searchResults: any;
  constructor(
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public coffeeHouseApi : CoffeeHouseApi) {  }

 searchForCoffeeHouses(){
    let loader = this.loadingController.create({
      content: 'Searching...'
    });
loader.present().then(() => {
   this.coffeeHouseApi.search(this.searchLocation).then(data => {
        this.searchResults = data;
        loader.dismiss();
        this.navCtrl.push(SearchResults, this.searchResults);
      });
  });
 }

}
