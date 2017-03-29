import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import *  as AppConfig from '../app/app.config';

@Injectable()
export class CoffeeHouseDataService {

  private baseUrl = AppConfig.data.mapsBaseUrl;
  private apiKey = AppConfig.data.googleMapsApiKey;
  constructor(private http:Http) { }

  getGeoLocationFromAddress(address){
    return new Promise(resolve => {
          this.http.get(`${this.baseUrl}/geocode?address=${address}&key=${this.apiKey}`,)
              .subscribe(res => resolve(res.json()));
      });
  }

  getPlacesByGeoLocation(location, type:string = "coffee"){
          return new Promise(resolve => {
              this.http.get(`${this.baseUrl}/nearbysearch?location=${location}&keyword=${type}&key=${this.apiKey}`)
                  .subscribe(res => resolve(res.json()));
          });
    }

}
