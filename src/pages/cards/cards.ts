import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ChemicalContainer } from '../Chemical_Container';
import { ChemDetailsPage } from '../chemDetails/chemDetails';

@Component({
  selector: 'page-CardsPage',
  templateUrl: 'cards.html'
})
export class CardsPage {
  finalScenario;
  finalLevel;
  finalFile;
  selectedChemicals = [];
  //just a duplicate to refresh the original when searching
  selectedChemicals2 = [];
  RML_10Data : ChemicalContainer;
  RML_30Data : ChemicalContainer;
  RSL_01Data : ChemicalContainer;
  RSL_10Data : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.finalScenario = navParams.get('finalScenario');
    this.finalLevel = navParams.get('finalLevel');
    this.finalFile = navParams.get('finalFile');
    this.selectedChemicals = navParams.get('selectedChemicals');
    this.selectedChemicals2 = this.selectedChemicals;
    this.RML_10Data = navParams.get('RML_10Data');


    if(this.finalFile == 'Target Risk: 1E-6 and File Quotient: 1.0') {
      //already read the file in the beginning
      this.finalFile = "RML_10Data";
     }
    if(this.finalFile == 'Target Risk: 1E-4 and File Quotient: 1.0') {
      this.RSL_10Data = new ChemicalContainer(this.http, '../assets/csv/RSL_1_0.csv');
      this.finalFile = "RSL_10Data";
     }
    if(this.finalFile == 'Target Risk: 1E-6 and File Quotient: 0.1') {
      this.RSL_01Data = new ChemicalContainer(this.http, '../assets/csv/RSL_0_1.csv');
      this.finalFile = "RSL_01Data";
     }
    if(this.finalFile == 'Target Risk: 1E-4 and File Quotient: 3.0') {
      this.RML_30Data = new ChemicalContainer(this.http, '../assets/csv/RML_3_0.csv');
      this.finalFile = "RML_30Data";
    }
  }

  openChemCard(chemical) {
    this.navCtrl.push(ChemDetailsPage, {
      'chemical': chemical,
      'finalFile': this.finalFile,
      finalFile: this.finalFile

    });
  }

  displayCasNum(chemical):string {
    return this.RML_10Data.getCasnum(chemical);
  }
  displayResSoilLabel(chemical):string {
    return "Resident Soil (mg/kg): ";
  }
  displayResSoil(chemical):string {
    var result : string;
    result = String(this.RML_10Data.getResidentSoil(chemical)[0]);
    return result;
  }
  displayResSoilKey(chemical):string {
    return this.RML_10Data.getResidentSoil(chemical)[1];
  }
  displayIndSoil(chemical):string {
    var result : string;
    result = String(this.RML_10Data.getIndustrialSoil(chemical)[0]);
    return result;
  }
  displayIndSoilKey(chemical):string {
    return this.RML_10Data.getIndustrialSoil(chemical)[1];
  }
  displayMCL(chemical):string {
    var result : string;
    result = String(this.RML_10Data.getMCL(chemical));
    return result;
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.selectedChemicals = this.selectedChemicals2;

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
