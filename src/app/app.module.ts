import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { InfoPage } from '../pages/info/info';

import { RSLInfoPage } from '../pages/info/RSLInfo/RSLInfo';
import { RMLInfoPage } from '../pages/info/RMLInfo/RMLInfo';


import { StaffPage } from '../pages/contact/staff/staff';

import { ChemSelectPage } from '../pages/chemSelect/chemSelect';
import { TargetRiskHazardPage } from '../pages/chemSelect/screeningType/targetRiskHazard/targetRiskHazard';
import { ScreeningTypePage } from '../pages/chemSelect/screeningType/screeningType';
import { ScenarioPage } from '../pages/chemSelect/screeningType/targetRiskHazard/scenario/scenario';
import { ExposureRoutesPage } from '../pages/chemSelect/screeningType/targetRiskHazard/scenario/exposureRoutes/exposureRoutes';
import { CardsPage } from '../pages/chemSelect/screeningType/targetRiskHazard/scenario/exposureRoutes/cards/cards';
import { ChemDetailsPage } from '../pages/chemSelect/screeningType/targetRiskHazard/scenario/exposureRoutes/cards/chemDetails/chemDetails';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HTTP } from '@ionic-native/http';
//import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ChemSelectPage,
    TargetRiskHazardPage,
    ScreeningTypePage,
    ScenarioPage,
    ExposureRoutesPage,
    CardsPage,
    ChemDetailsPage,
    StaffPage,
    InfoPage,
    RSLInfoPage,
    RMLInfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage ,
    ChemSelectPage,
    ScreeningTypePage,
    TargetRiskHazardPage,
    ScenarioPage,
    ExposureRoutesPage,
    CardsPage,
    ChemDetailsPage,
    StaffPage,
    InfoPage,
    RSLInfoPage,
    RMLInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
