import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../../Chemical_Container';
import { TargetRiskHazardPage } from './targetRiskHazard/targetRiskHazard';

@Component({
  selector: 'page-ScreeningTypePage',
  templateUrl: 'screeningType.html'
})
export class ScreeningTypePage {
  items;
  checkboxes = [];
  //Is at least one scenario picked?
  oneChecked = false;
  data : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
    this.initializeCheckboxes();

    this.data = navParams.get('data');
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
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        this.oneChecked = true;
        //fix after push
    //    this.data.selectedChemicals.push(item);
      }
    }

    if(this.oneChecked == true) {
      this.navCtrl.push(TargetRiskHazardPage, {
        'data': this.data
      });
    } else {
        alert("Please select at least one option.");
      }
  }

  initializeItems() {
    this.items = [
      'RSL (Regional Screening Levels)',
      'RML (Regional Removal Management Levels)'
    ];
  }
}
