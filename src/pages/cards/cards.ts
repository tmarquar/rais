import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';
//import { NextPage } from '../pages/next/next';

@Component({
  selector: 'page-CardsPage',
  templateUrl: 'cards.html'
})
export class CardsPage {
  finalScenario;
  selectedChemicals = [];
  //just a duplicate to refresh the original when searching
  selectedChemicals2 = [];
  chemTest2 : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.finalScenario = navParams.get('data1');
    this.selectedChemicals = navParams.get('data2');
    this.selectedChemicals2 = this.selectedChemicals;
    this.chemTest2 = navParams.get('data3');
  }

  openChemCard(chemical) {

  }

  displayChemicalInfo(chemical) {
    /*It breaks here
    this.chemTest2[chemical].getChemicalName();
    this.chemTest2[chemical].getCasnum();
    this.chemTest2[chemical].getResidentSoil();
    this.chemTest2[chemical].getIndustrialSoil();
    */
  }

  //For the search bar
  refreshSelectedChemicals() {
      this.selectedChemicals = this.selectedChemicals2;
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.refreshSelectedChemicals();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.selectedChemicals = this.selectedChemicals.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
