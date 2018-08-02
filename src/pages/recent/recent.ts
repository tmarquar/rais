/******************************************************************
* very similar to favorites. It loads the database and displays the
* information
******************************************************************/

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';
import { FavDetailsPage } from '../favorites/favDetails/favDetails';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';
import { SQLite } from '@ionic-native/sqlite';


@Component({
  selector: 'page-RecentPage',
  templateUrl: 'recent.html'
})
export class RecentPage {
  items;
  buttonIcon:string[] = [];
  data: ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HTTP, private file:File,private sqlite: SQLite,private loadingCtrl: LoadingController) {
    this.data = new ChemicalContainer(this.http, this.file, this.sqlite);
    this.data.loadRecents();
    this.initializeItems();
  }


  goToNextPage(chemical:string) : void {
    this.navCtrl.push(FavDetailsPage, {
      'chemical': chemical,
      'data': this.data
    });
  }

  async initializeItems()  {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 500
    });
    // same issue as in favorites * see favorites
    await loading.present();

    this.items = this.data.getSavedChemicals();
    for (let item of this.items) {
      this.buttonIcon[item] = "star-outline";
    }
  }

  toggleFavorite(chemical:string):void {
    if (this.buttonIcon[chemical] === 'star-outline') {
       this.buttonIcon[chemical] = "star";
       this.data.loadChemicalData(chemical);
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
