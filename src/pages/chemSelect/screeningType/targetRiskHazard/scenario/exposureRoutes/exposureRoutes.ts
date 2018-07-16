import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../../../../../Chemical_Container';
import { CardsPage } from './cards/cards';

@Component({
  selector: 'page-ExposureRoutesPage',
  templateUrl: 'exposureRoutes.html'
})
export class ExposureRoutesPage {
  items;
  checkboxes = [];
  //Is at least one scenario picked?
  oneChecked = false;
  data : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get('data');
    this.initializeItems();
    this.initializeCheckboxes();
  }

  initializeCheckboxes() {
    for (let item of this.items) {
      this.checkboxes[item] = false;
    }
  }

  toggleCheckboxes(item) {
    this.checkboxes[item] = !this.checkboxes[item];
  }

  goToOtherPage() {
    //Check if at least one box is checked before moving on
    this.data.clearExposureRoutes();
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        this.oneChecked = true;
        this.data.addExposureRoute(item);
      }
    }

    if(this.oneChecked == true) {
      this.navCtrl.push(CardsPage, {
        'data': this.data
      });
    } else {
        alert("Please select at least one option.");
      }
  }

  initializeItems() :void {
    this.items = this.data.getExposureRouteOptions();
  }
}
