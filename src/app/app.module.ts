import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyApp } from './app.component';
import { Search, MapPage } from '../pages/pages';
import { CoffeeHouseDataService } from '../services/services';
import *  as AppConfig from './app.config'
import { RatingStarsComponent } from '../components/ratingstars.component/ratingstars.component'

@NgModule({
  declarations: [
    MyApp,
    Search,
    MapPage,
    RatingStarsComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: AppConfig.data.googleMapsJavaScriptKey})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Search,
    MapPage,
    RatingStarsComponent
  ],
  providers: [ CoffeeHouseDataService,
  {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
