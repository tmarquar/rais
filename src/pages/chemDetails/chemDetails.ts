import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';

@Component({
  selector: 'page-ChemDetailsPage',
  templateUrl: 'chemDetails.html'
})
export class ChemDetailsPage {
  chemical;
  RML_10Data : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chemical = navParams.get('chemical');
    this.RML_10Data = navParams.get('RML_10Data');

    this.dummy(this.chemical);
  }

  displayHeader(chemical) : string {
  /*  if(chemical == this.chemical) {
      return this.chemical;
    } else {
      return "empty";
    } */
    return "Hello";

  }

  dummy(chemical:string):string {
    var casNo, residentSoil, industrialSoil, residentTapwater, MCL : string ;

    for(let chemical of this.RML_10Data) {
      casNo = "CAS No.: " + this.RML_10Data.getCasnum(chemical);
    }
    return casNo;
  }
}
