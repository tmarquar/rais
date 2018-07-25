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
  buttonIcon = "star-outline";
  
  //just a duplicate to refresh the original when searching
  selectedChemicalsCopy:string[];
  data: ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.data = navParams.get('data');
      this.selectedChemicalsCopy = this.data.getSelectedChemicals();
      this.initializeItems();
  }

  goToNextPage(chemical:string) : void {
    this.navCtrl.push(ChemDetailsPage, {
      'chemical': chemical,
      'data': this.data
    });
  }

  initializeItems() : void {
    this.items = this.data.getSelectedChemicals();
  }

  toggleFavorite(button) {
    if (this.buttonIcon === 'star-outline') {
       this.buttonIcon = "star";
     }
     else {
       this.buttonIcon = "star-outline";
     }
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
