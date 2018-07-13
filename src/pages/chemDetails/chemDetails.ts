import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';

@Component({
  selector: 'page-ChemDetailsPage',
  templateUrl: 'chemDetails.html'
})
export class ChemDetailsPage {
  chemical : string;
  finalFile;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chemical = navParams.get('chemical');
    this.finalFile = navParams.get('finalFile');
  //  finalFile : ChemicalContainer;
    console.log(finalFile);
  //  this.RML_10Data = navParams.get('RML_10Data');
  }
  getFinalFileName(finalFile) {
    return this.finalFile;
  }
  displayHeader() : string {
    return this.chemical;
  }

  displayCasNum(chemical):string {
    return this.RML_10Data.getCasnum(this.chemical);
  }
  displayResSoil(chemical):string {
    var result : string;
    result = String(this.RML_10Data.getResidentSoil(this.chemical)[0]);
    return result;
  }
  displayResSoilKey(chemical):string {
    return this.RML_10Data.getResidentSoil(this.chemical)[1];
  }
  displayIndSoil(chemical):string {
    var result : string;
    result = String(this.RML_10Data.getIndustrialSoil(this.chemical)[0]);
    return result;
  }
  displayIndSoilKey(chemical):string {
    return this.RML_10Data.getIndustrialSoil(this.chemical)[1];
  }
  displayMCL(chemical):string {
    var result : string;
    result = String(this.RML_10Data.getMCL(this.chemical));
    return result;
  }
}
