import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyApp } from './app.component';
import { Search, Page2, SearchResults, MapPage } from '../pages/pages';
import { CoffeeHouseApi } from '../services/services';

@NgModule({
  declarations: [
    MyApp,
    Search,
    Page2,
    SearchResults,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Search,
    Page2,
    SearchResults,
    MapPage
  ],
  providers: [ CoffeeHouseApi,
  {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
