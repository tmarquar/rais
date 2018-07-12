import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { NextPage } from '../pages/next/next';
@Component({
  selector: 'page-CardsPage',
  templateUrl: 'cards.html'
})
export class CardsPage {
  radioButtons = [];
  selectedChemicals = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.radioButtons = navParams.get('data1');
    this.selectedChemicals = navParams.get('data2');
  }

  displayChemicalInfo(chemical) {

  }

  getItems(ev) {
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
