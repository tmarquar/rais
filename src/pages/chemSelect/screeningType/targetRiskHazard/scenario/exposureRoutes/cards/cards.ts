/***********************************************************************
* This is the results page for our selections. This layout is duplicated
* for recent searches and favorites page. First use of the database
*
********************************************************************/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../../../../../../Chemical_Container';
import { ChemDetailsPage } from './chemDetails/chemDetails';

@Component({
  selector: 'page-CardsPage',
  templateUrl: 'cards.html'
})
export class CardsPage {
  items;
  buttonIcon:string[] = [];
  data: ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get('data'); // get data
    this.initializeItems();
    // this will delete and reload the database
    this.data.addRecents(); // tells ChemicalContainer it has reached the end and should save the info.
  }

  goToNextPage(chemical:string) : void {
    this.navCtrl.push(ChemDetailsPage, {
      'chemical': chemical,
      'data': this.data
    });
  }

  initializeItems() : void {
    this.items = this.data.getSelectedChemicals();
    for (let item of this.items) {
      this.buttonIcon[item] = 'star-outline';
    }
  }

  toggleFavorite(chemical:string):void {
    if (this.buttonIcon[chemical] === 'star-outline') {
       this.buttonIcon[chemical] = "star";
       // this is so that it overwrites the previous favorite of the same chemical
       this.data.deleteFavorite(chemical);
       this.data.addFavorite(chemical);
     }
     else {
       this.buttonIcon[chemical] = "star-outline";
       this.data.deleteFavorite(chemical);
     }
  }

  getButtonIcon(chemical:string):string {
    return this.buttonIcon[chemical];
  }
}
