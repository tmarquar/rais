/********************************************************
* Simple lookup 
*
*********************************************************/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../../../../../../../Chemical_Container';

@Component({
  selector: 'page-ChemDetailsPage',
  templateUrl: 'chemDetails.html'
})
export class ChemDetailsPage {
  chemical : string;
  data: ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chemical = navParams.get('chemical');
    this.data = navParams.get('data'); // get ChemicalContainer
  }

  displayHeader() : string {
    return this.chemical;
  }
  getAllFormattedData () : string[] {
    return this.data.getAllFormattedData(this.chemical);
  }
}
