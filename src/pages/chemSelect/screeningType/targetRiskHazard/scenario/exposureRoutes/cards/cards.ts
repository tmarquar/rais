import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../../../../../../Chemical_Container';
import { ChemDetailsPage } from './chemDetails/chemDetails';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-CardsPage',
  templateUrl: 'cards.html'
})
export class CardsPage {
  items;
  buttonIcon:string[] = [];

  //just a duplicate to refresh the original when searching
  selectedChemicalsCopy:string[];
  data: ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: Toast, private toastCtrl: ToastController) {
    this.data = navParams.get('data');
    this.selectedChemicalsCopy = this.data.getSelectedChemicals();
    this.initializeItems();
    //this.showMessage();
  }

  showMessage (): void {
    let myToast = this.toastCtrl.create({
      message: 'If you favorite a chemical card of a chemical that is already in your favorites, then the favorite card will be overwritten',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    myToast.present(myToast);
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
