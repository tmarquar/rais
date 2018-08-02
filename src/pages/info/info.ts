/******************************************
* links to two info pages
******************************************/
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RMLInfoPage } from './RMLInfo/RMLInfo';
import { RSLInfoPage } from './RSLInfo/RSLInfo';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  constructor(public navCtrl: NavController) {

  }
  goToRML () {
    this.navCtrl.push(RMLInfoPage, {

    });
  }

  goToRSL () {
    this.navCtrl.push(RSLInfoPage, {

    });
  }

}
