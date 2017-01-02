import { Injectable } from '@angular/core';
import {Http} from '@angular/http'

@Injectable()
export class CoffeeHouseApi {
  private baseUrl = '';
  constructor(private http:Http) { }
}
