import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';

@Component({
  selector: 'page-ChemDetailsPage',
  templateUrl: 'chemDetails.html'
})
export class ChemDetailsPage {
  chemical : string;
  data: ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chemical = navParams.get('chemical');
    this.data = navParams.get('data');
  }

  displayHeader() : string {
    return this.chemical;
  }

  displayCasNum(chemical):string {
    return this.data.getCasnum(this.chemical);
  }
  displayResidentSoil(chemical):string {
    var result : string;
    result = String(this.data.getResidentSoil(this.chemical)[0]);
    return result;
  }
  displayResidentSoilKey(chemical):string {
    return this.data.getResidentSoil(this.chemical)[1];
  }
  displayIndustrialSoil(chemical):string {
    var result : string;
    result = String(this.data.getIndustrialSoil(this.chemical)[0]);
    return result;
  }
  displayIndustrialSoilKey(chemical):string {
    return this.data.getIndustrialSoil(this.chemical)[1];
  }
  displayMCL(chemical):string {
    var result : string;
    result = String(this.data.getMCL(this.chemical));
    return result;

  }
}
