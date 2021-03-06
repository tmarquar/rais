/********************************************************
* This was the first iteration, and is no longer used.
* It is too much work to delete so it remains for now.
* New version is RML and RSL search.
*******************************************************/

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

  getIcon(item):string{
    if (this.checkboxes[item]){
      return "checkbox-outline";
    }else{
      return "square-outline";
    }
  }

  goToOtherPage() {
    //Check if at least one box is checked before moving on
    this.data.clearScreeningType();
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        this.oneChecked = true;
        this.data.addScreeningType(item);
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
