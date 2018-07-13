import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';

@Component({
  selector: 'page-ChemDetailsPage',
  templateUrl: 'chemDetails.html'
})
export class ChemDetailsPage {
  chemical : string;
  RML_10Data : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chemical = navParams.get('chemical');
    this.RML_10Data = navParams.get('RML_10Data');

    this.dummy(this.chemical);
  }

  displayHeader() : string {
  /*  if(chemical == this.chemical) {
      return this.chemical;
    } else {
      return "empty";
    } */
    return "Hello";

  }

  dummy(chemical:string):string {
    var casNo, residentSoil, industrialSoil, residentTapwater, MCL : string ;

    return "hello";
  }
}
