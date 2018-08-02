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
import { RecentPage } from '../pages/recent/recent';

export interface PageInterface {
  title:string;
  pageName: any;
  component?: any;
  index?:number;
  icon:string;
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
      { title: 'Start', pageName: StartPage, icon: "apps" },
      { title: 'Favorites', pageName: FavoritesPage, icon: "star" },
      { title: 'Home', pageName: HomePage, icon: "home", component: HomePage, index: 0 },
      { title: 'RSL Search',pageName: TabsPage, icon: "search" ,component: RSLSearchPage, index: 1 },
      { title: 'RML Search',pageName: TabsPage, icon: "search", component: RMLSearchPage, index: 2 },
      { title: 'About', pageName: AboutPage, icon: "cog" },
      { title: 'Info', pageName: InfoPage, icon: "information-circle" },
      { title: 'Contact Us', pageName: ContactPage, icon: "contact" },
      { title: 'Key', pageName: TabsPage, icon: "key", component: KeyPage, index: 3 },
      { title: 'Tutorial', pageName: TutorialPage, icon: "help" },
      { title: 'Recent Search', pageName: RecentPage, icon: "time" }
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
