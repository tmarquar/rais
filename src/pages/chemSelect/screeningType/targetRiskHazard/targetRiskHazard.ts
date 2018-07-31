import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../../../Chemical_Container';
import { ScenarioPage } from './scenario/scenario';


@Component({
  selector: 'page-TargetRiskHazardPage',
  templateUrl: 'targetRiskHazard.html'
})
export class TargetRiskHazardPage {
  items;
  checkboxes = [];
  //Is at least one radio button picked?
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
    this.data.clearTargetRiskHazard();
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        this.oneChecked = true;
        this.data.addTargetRiskHazard(item);
      }
    }

    if(this.oneChecked == true) {
      this.navCtrl.push(ScenarioPage, {
        'data': this.data
      });
    } else {
        alert("Please select at least one option.");
      }
  }

  initializeItems() {
    this.items = this.data.getTargetRiskHazardOptions();
  }
}
