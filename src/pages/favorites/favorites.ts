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

  //just a duplicate to refresh the original when searching
  selectedChemicalsCopy:string[] = [];
  data: ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HTTP, private file:File,private sqlite: SQLite, private toastCtrl: ToastController,private loadingCtrl: LoadingController) {
    this.data = new ChemicalContainer(this.http, this.file, this.sqlite);
    this.initializeItems();
    this.selectedChemicalsCopy = this.data.getFavoriteChemicals();
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
    let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });
    //let result = await loading;

    //let result = await this.data.loadData();
    //console.log("endwait");
    this.items = this.data.getFavoriteChemicals();
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
