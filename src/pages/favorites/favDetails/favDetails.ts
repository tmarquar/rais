import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../../Chemical_Container';

@Component({
  selector: 'page-FavDetailsPage',
  templateUrl: 'favDetails.html'
})
export class FavDetailsPage {
  chemical : string;
  data: ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.chemical = navParams.get('chemical');
    //this.data = navParams.get('data');
  }

  displayHeader() : string {
    return this.chemical;
  }
  getAllFormattedData () : string[] {
    //console.log(this.chemical);
    return this.data.getAllFormattedData(this.chemical);
  }
}
