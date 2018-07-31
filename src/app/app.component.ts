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


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = StartPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Favorites', component: FavoritesPage },
      { title: 'Home', component: TabsPage },
      { title: 'RSL Search', component: RSLSearchPage},
      { title: 'RML Search', component: RMLSearchPage},
      { title: 'About', component: AboutPage},
      { title: 'Info', component: InfoPage},
      { title: 'ContactUs', component: ContactPage},
      { title: 'Key', component: KeyPage },
      { title: 'Start', component: StartPage}

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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
