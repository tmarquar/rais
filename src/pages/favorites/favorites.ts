/*********************************************************
* Favorites uses the database in ChemicalContainer to
* show certain chemicals. It is very similar to the
* cards page
*
*
***********************************************************/

import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';
import { FavDetailsPage } from './favDetails/favDetails';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { StartPage } from '../start/start';

@Component({
  selector: 'page-FavoritesPage',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  items;
  buttonIcon:string[] = [];
  selectedChemicalsCopy:string[] = [];
  data: ChemicalContainer;

  // The page constructors get package information automatically that then needs to be sent to chemical container so
  // it can have the same references
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HTTP, private file:File,private sqlite: SQLite, private toastCtrl: ToastController,private loadingCtrl: LoadingController) {
    // http is not really used.
    this.data = new ChemicalContainer(this.http, this.file, this.sqlite);
    this.data.loadFavorites(); // the database takes a moment to load so do it first
    this.initializeItems();

  }

  showToast (): void {
    let toast = this.toastCtrl.create({
      message: 'Favorites have been cleared successfully.',
      duration: 3000,
      position: 'bottom'
    });
    toast.present(toast);
  }

  clearFavorites() {
   for(let item of this.items) {
      this.data.deleteFavorite(item);
    }
    this.showToast();
    //kick them out of the page
    this.navCtrl.setRoot(StartPage,{});
  }

  goToNextPage(chemical:string) : void {
    this.navCtrl.push(FavDetailsPage, {
      'chemical': chemical,
      'data': this.data
    });
  }

  // async allows code in this function to wait for
  // other parts to finish before running.
  async initializeItems()  {
    // this is a promise meaning that is runs asynchronously,
    // so we need to make the program wait for this to finish
    // because while this is displaying, data is loading the database
    // this gives the database a .5 second head start and is a crude
    // fix to a bigger problem
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 500
    });
    // await tells the function to stop here until something returns.
    // it would be better if this waited for the sqldatabase to return that
    // everything is loaded, but that proves difficult so instead we just wait
    // until it is likely finished
    await loading.present();


    this.items = this.data.getSavedChemicals();
    for (let item of this.items) {
      this.buttonIcon[item] = 'star';
    }
  }

  toggleFavorite(chemical:string):void {
    if (this.buttonIcon[chemical] === 'star-outline') {
       this.buttonIcon[chemical] = "star";
       this.data.loadChemicalData(chemical); // what?
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
