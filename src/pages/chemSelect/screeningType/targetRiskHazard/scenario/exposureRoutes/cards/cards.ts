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
}
