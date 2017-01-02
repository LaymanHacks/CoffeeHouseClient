import { Injectable } from '@angular/core';
import {Http} from '@angular/http'

@Injectable()
export class CoffeeHouseApi {
  private baseUrl = 'http://localhost:8082/api';
  constructor(private http:Http) { }

    search(address){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/search?address=${address}`)
                .subscribe(res => resolve(res.json()));
        });
    }

    getLocationData(address){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/location?address=${address}`)
                .subscribe(res => resolve(res.json()));
        });
    }


}
