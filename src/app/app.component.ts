import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { FavoritesPage } from '../pages/favorites/favorites';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { InfoPage } from '../pages/info/info';
import { ContactPage } from '../pages/contact/contact';
import { KeyPage } from '../pages/key/key';
import { RSLSearchPage } from '../pages/RSLSearch/RSLSearch';
import { RMLSearchPage } from '../pages/RMLSearch/RMLSearch';
import { StartPage } from '../pages/start/start';
import { TutorialPage } from '../pages/tutorial/tutorial';


export interface PageInterface {
  title:string;
  pageName: any;
  component?: any;
  index?:number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = StartPage;

  pages: PageInterface[] = []

  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen) {
    this.initializeApp();


    this.pages = [
      { title: 'Favorites', pageName: FavoritesPage },
      { title: 'Home', pageName: TabsPage, component: HomePage, index: 0 },
      { title: 'RSL Search',pageName: TabsPage, component: RSLSearchPage, index: 1 },
      { title: 'RML Search',pageName: TabsPage, component: RMLSearchPage, index: 2 },
      { title: 'About', pageName: AboutPage},
      { title: 'Info', pageName: InfoPage},
      { title: 'Contact Us', pageName: ContactPage},
      { title: 'Key', pageName: TabsPage, component: KeyPage, index: 3 },
      { title: 'Start', pageName: StartPage},
      { title: 'Tutorial', pageName: TutorialPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.pageName, params);
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }

}
