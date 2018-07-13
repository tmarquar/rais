import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ChemSelectPage } from '../pages/chemSelect/chemSelect';
import { LevelSelectPage } from '../pages/levelSelect/levelSelect';
import { FileSelectPage } from '../pages/fileSelect/fileSelect';
import { ScenarioPage } from '../pages/scenario/scenario';
import { CardsPage } from '../pages/cards/cards';
import { ChemDetailsPage } from '../pages/chemDetails/chemDetails';
import { StaffPage } from '../pages/contact/staff/staff';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ChemSelectPage,
    LevelSelectPage,
    FileSelectPage,
    ScenarioPage,
    CardsPage,
    ChemDetailsPage,
    StaffPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage ,
    ChemSelectPage,
    LevelSelectPage,
    FileSelectPage,
    ScenarioPage,
    CardsPage,
    ChemDetailsPage,
    StaffPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
