import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ScreeningTypePage } from './screeningType/screeningType';
import { ChemicalContainer} from '../Chemical_Container';

@Component({
  selector: 'page-chemSelect',
  templateUrl: 'chemSelect.html'
})
export class ChemSelectPage {
  items;
  checkboxes = [];
  data : ChemicalContainer;

  constructor(public navCtrl: NavController, private http: Http) {
    this.data = new ChemicalContainer(this.http, '../assets/csv/RML_1_0.csv');
    this.items = this.data.getChemicalNames();
    this.initializeCheckboxes();
  }

  initializeCheckboxes() {
    for (let item of this.items) {
      this.checkboxes[item] = false;
    }
  }

  toggleCheckboxes(item) {
    this.checkboxes[item] = !this.checkboxes[item];
  }

  goToOtherPage() {
    var oneChecked: boolean = false;
    this.data.resetSelectedChemicals();

    //Check if at least one box is checked before moving on
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        oneChecked = true;
        this.data._selectedChemicals.push(item);
      }
    }

    //If everything's good, move on to the next page
    if(oneChecked == true) {
     this.navCtrl.push(ScreeningTypePage, {
       'data': this.data
     });
   } else {
      alert("At least one chemical must be checked.");
   }
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.items = this.data.getChemicalNames();

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
