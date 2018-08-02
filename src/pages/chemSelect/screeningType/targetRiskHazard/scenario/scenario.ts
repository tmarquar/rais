/***********************************************************
* This allows us to select the scenaio again based on previous
* information that is retrieved from ChemicalContainer.
***********************************************************/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../../../../Chemical_Container';
import { ExposureRoutesPage } from './exposureRoutes/exposureRoutes';

@Component({
  selector: 'page-ScenarioPage',
  templateUrl: 'scenario.html'
})
export class ScenarioPage {
  items;
  checkboxes = [];
  //Is at least one scenario picked?
  oneChecked = false;
  data : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // get ChemicalContainer
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

  getIcon(item):string{
    if (this.checkboxes[item]){
      return "checkbox-outline";
    }else{
      return "square-outline";
    }
  }

  goToOtherPage() {
    //Check if at least one box is checked before moving on
    this.data.clearScenario();
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        this.oneChecked = true;
        this.data.addScenario(item); // push to ChemicalContainer
      }
    }

    if(this.oneChecked == true) {
      this.navCtrl.push(ExposureRoutesPage, {
        'data': this.data
      });
    } else {
        alert("Please select at least one option.");
      }
  }

  initializeItems() :void {
    this.items = this.data.getScenarioOptions();
  }
}
