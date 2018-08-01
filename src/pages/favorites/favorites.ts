import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';
import { FavDetailsPage } from './favDetails/favDetails';
import { HTTP } from '@ionic-native/http';
//import { ChemicalContainer} from '../Chemical_Container';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HTTP, private file:File,private sqlite: SQLite, private toastCtrl: ToastController,private loadingCtrl: LoadingController) {
    this.data = new ChemicalContainer(this.http, this.file, this.sqlite);
    this.data.loadFavorites();
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

  async initializeItems()  {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 500
    });

    await loading.present();


    this.items = this.data.getSavedChemicals();
    for (let item of this.items) {
      this.buttonIcon[item] = 'star';
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
