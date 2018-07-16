import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ChemicalContainer } from '../../Chemical_Container';
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
  data: ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.finalScenario = navParams.get('finalScenario');
    this.finalLevel = navParams.get('finalLevel');
    this.finalFile = navParams.get('finalFile');
    this.selectedChemicals = navParams.get('selectedChemicals');
    this.selectedChemicals2 = this.selectedChemicals;

    if(this.finalFile == 'Target Risk: 1E-4 and File Quotient: 1.0') {
      this.data = new ChemicalContainer(this.http, '../../assets/csv/RSL_1_0.csv');
    } else if(this.finalFile == 'Target Risk: 1E-6 and File Quotient: 0.1') {
      this.data = new ChemicalContainer(this.http, '../../assets/csv/RSL_0_1.csv');
    } else if(this.finalFile == 'Target Risk: 1E-4 and File Quotient: 3.0') {
      this.data = new ChemicalContainer(this.http, '../../assets/csv/RML_3_0.csv');
    }
    console.log(this.finalLevel);
    console.log(this.finalScenario);
    console.log(this.finalFile);
  }

  openChemCard(chemical) {
    this.navCtrl.push(ChemDetailsPage, {
      'chemical': chemical,
      'data': this.data
    });
  }

  displayCasNum(chemical):string {
    return this.data.getCasnum(chemical);
  }
  displayResidentSoilLabel(chemical):string {
    return "Resident Soil (mg/kg): ";
  }
  displayResidentSoil(chemical):string {
    var result : string;
    result = String(this.data.getResidentSoil(chemical)[0]);
    return result;
  }
  displayResidentSoilKey(chemical):string {
    return this.data.getResidentSoil(chemical)[1];
  }
  displayIndustrialSoil(chemical):string {
    var result : string;
    result = String(this.data.getIndustrialSoil(chemical)[0]);
    return result;
  }
  displayIndustrialSoilKey(chemical):string {
    return this.data.getIndustrialSoil(chemical)[1];
  }
  displayMCL(chemical):string {
    var result : string;
    result = String(this.data.getMCL(chemical));
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
