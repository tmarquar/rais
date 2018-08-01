import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FavoritesPage } from '../favorites/favorites';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { InfoPage } from '../info/info';
import { ContactPage } from '../contact/contact';
import { KeyPage } from '../key/key';
import { RSLSearchPage } from '../RSLSearch/RSLSearch';
import { RMLSearchPage } from '../RMLSearch/RMLSearch';
import { StartPage } from '../start/start';

@Component({
  selector: 'page-Tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  //tab2Root = AboutPage;
  //tab3Root = InfoPage;
  //tab4Root = ContactPage;
  tab2Root = RSLSearchPage;
  tab3Root = RMLSearchPage;
  tab4Root = KeyPage;
  myIndex:number;
  constructor(navParams: NavParams) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }
}
