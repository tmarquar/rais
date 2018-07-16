import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ChemicalContainer } from '../../../../../../Chemical_Container';
import { ChemDetailsPage } from './chemDetails/chemDetails';

@Component({
  selector: 'page-CardsPage',
  templateUrl: 'cards.html'
})
export class CardsPage {
  selectedChemicalsCopy:string[];
  //just a duplicate to refresh the original when searching
  data: ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
      this.data = navParams.get('data');
      this.selectedChemicalsCopy = this.data.getSelectedChemicals();
  }

  openChemCard(chemical:string) : void {
    this.navCtrl.push(ChemDetailsPage, {
      'chemical': chemical,
      'data': this.data
    });
  }

  getItems(ev) : void {
    // Reset items back to all of the items
    this.data.setSelectedChemicals(this.selectedChemicalsCopy);

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.data.getSelectedChemicals().filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
