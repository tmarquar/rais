/*****************************************************
* Has buttons that link to pages. YAY
*
*******************************************************/

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { RSLSearchPage } from '../RSLSearch/RSLSearch';
import { RMLSearchPage } from '../RMLSearch/RMLSearch';
import { TutorialPage } from '../tutorial/tutorial';
import { Toast } from '@ionic-native/toast';


@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})

export class StartPage {

  constructor(public navCtrl: NavController, private toast: Toast) {

  }

  goHome() {
    this.navCtrl.setRoot(HomePage, {});
  }
  goToRMLSearch() {

    this.navCtrl.setRoot(TabsPage, { tabIndex: 2 });
  }
  goToRSLSearch() {

    this.navCtrl.setRoot(TabsPage, { tabIndex: 1 });
  }
  goToTutorial() {
    this.navCtrl.setRoot(TutorialPage, { });
  }
}
