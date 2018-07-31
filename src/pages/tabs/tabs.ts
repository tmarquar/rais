import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ChemSelectPage} from '../chemSelect/chemSelect';
//import { InfoPage } from '../info/info';
import { KeyPage } from '../key/key';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  //tab2Root = AboutPage;
  //tab3Root = InfoPage;
  //tab4Root = ContactPage;
  tab2Root = ChemSelectPage;
  tab3Root = KeyPage;

  constructor() {

  }
}
