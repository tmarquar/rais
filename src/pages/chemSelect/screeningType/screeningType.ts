import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../../Chemical_Container';
import { TargetRiskHazardPage } from './targetRiskHazard/targetRiskHazard';

@Component({
  selector: 'page-ScreeningTypePage',
  templateUrl: 'screeningType.html'
})
export class ScreeningTypePage {
  items:string[] = [];
  checkboxes:boolean[] = [];
  //Is at least one scenario picked?
  oneChecked:boolean = false;
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
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        this.oneChecked = true;
        // update
        this.data._screeningType.push(item);
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
    this.items = this.data.getScreeningTypeOptions();
  }
}
