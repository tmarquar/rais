import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';
import {ChemicalData} from '../Chemical_Data';
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
  chemicalData : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.finalScenario = navParams.get('finalScenario');
    this.selectedChemicals = navParams.get('selectedChemicals');
    this.selectedChemicals2 = this.selectedChemicals;
    this.chemicalData = navParams.get('chemicalData');
    //this.chemicalData[0].getCasnum();
  }

  openChemCard(chemical) {

  }

  displayChemicalInfo(chemical:string):string {
    /*It breaks here
    this.chemicalData[chemical].getChemicalName();
    this.chemicalData[chemical].getCasnum();
    this.chemicalData[chemical].getResidentSoil();
    this.chemicalData[chemical].getIndustrialSoil();
    */
    
    return  this.chemicalData.getCasnum(chemical);
    //return chemical;
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
