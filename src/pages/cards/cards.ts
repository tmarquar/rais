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
  RML_10Data : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.finalScenario = navParams.get('finalScenario');
    this.selectedChemicals = navParams.get('selectedChemicals');
    this.selectedChemicals2 = this.selectedChemicals;
    this.RML_10Data = navParams.get('RML_10Data');
    //this.RML_10Data[0].getCasnum();
  }

  openChemCard(chemical) {

  }

  displayChemicalCasnum(chemical:string):string {
    var output : string ;
    output = "Casnum: " + this.RML_10Data.getCasnum(chemical);

    return output;
  }

  displayChemicalSoil(chemical:string):string {
    var information : [number,string];
    var output : string ;
    information = this.RML_10Data.getResidentSoil(chemical);
    information = this.RML_10Data.getIndustrialSoil(chemical);
    information = this.RML_10Data.getResidentTapwater(chemical);
    return "test";
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
