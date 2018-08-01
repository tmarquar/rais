import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
//import { ScreeningTypePage } from './screeningType/screeningType';
import { ChemicalContainer} from '../Chemical_Container';
import { File } from '@ionic-native/file';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { TargetRiskHazardPage } from '../chemSelect/screeningType/targetRiskHazard/targetRiskHazard';

@Component({
  selector: 'page-RSLSearch',
  templateUrl: 'RSLSearch.html'
})
export class RSLSearchPage {
  items;
  checkboxes = [];
  data : ChemicalContainer;

  constructor(public navCtrl: NavController, private http: HTTP, private file:File,private sqlite: SQLite, private loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 100
    });

    loading.present();
    this.data = new ChemicalContainer(this.http, this.file, this.sqlite);
    this.items = this.data.getChemicalNames();
    //this.items.splice(-1,1);
    this.initializeCheckboxes();
    this.data.addScreeningType(this.data.getScreeningTypeOptions()[0]);
  }

  initializeCheckboxes() {
    for (let item of this.items) {
      this.checkboxes[item] = false;
    }
  }
  toggleCheckboxes(item) {
    let index = this.items.indexOf(item);
    this.checkboxes[item] = !this.checkboxes[item];

  }

  getIcon(item):string{
    if (this.checkboxes[item]){
      return "checkbox-outline";
    }else{
      return "square-outline";
    }
  }

  goToOtherPage() {
    var oneChecked: boolean = false;
    this.data.resetSelectedChemicals();

    //Check if at least one box is checked before moving on
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        oneChecked = true;
        this.data.addChemical(item);
      }
    }

    //If everything's good, move on to the next page
    if(oneChecked == true) {
     this.navCtrl.push(TargetRiskHazardPage, {
       'data': this.data
     });
   } else {
      alert("At least one chemical must be checked.");
   }
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.items = this.data.getChemicalNames();
    //for(let item of this.items){
      //item.checked = this.checkboxes[item];
    //}


    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
