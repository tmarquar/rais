import { Component } from '@angular/core';
//import { Nav, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RSLSearchPage } from '../RSLSearch/RSLSearch';
import { RMLSearchPage } from '../RMLSearch/RMLSearch';
import { Toast } from '@ionic-native/toast';


@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})

export class StartPage {

  constructor(public navCtrl: NavController, private toast: Toast) {

  }

  goHome() {
    this.navCtrl.setRoot(TabsPage, {});
  }
  goToRMLSearch() {
    this.navCtrl.setRoot(RMLSearchPage, {});
  }
  goToRSLSearch() {
    this.navCtrl.setRoot(RSLSearchPage, {});
  }

}
