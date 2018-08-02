/*********************************************************
* This is the first page after RML or RSL search.
* It uses ChemicalContainer to retrieve the possible options
* based on previous decisions.
**********************************************************/

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
    // navParams gets info from previous pages
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
    this.data.clearTargetRiskHazard();
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        this.oneChecked = true;
        this.data.addTargetRiskHazard(item); //ChemicalContainer keeps track of everything
      }
    }
    // pushing to next page using navCtrl
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
