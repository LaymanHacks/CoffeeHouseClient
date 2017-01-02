import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { CoffeeHouseApi } from '../../services/services';
import { SearchResults } from '../pages';

@Component({
  selector: 'page-search',
  templateUrl: 'search.page.html'
})
export class Search {
  searchLocation: any;
  searchResults: any;
  constructor(public navCtrl: NavController, public coffeeHouseApi : CoffeeHouseApi) {  }

 searchForCoffeeHouses(){
   this.coffeeHouseApi.search(this.searchLocation).then(data => {
        this.searchResults = data;

        console.log(this.searchResults);
        this.navCtrl.push(SearchResults, this.searchResults);
      });

  }

}
