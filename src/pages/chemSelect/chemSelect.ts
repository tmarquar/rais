import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ScenarioPage } from '../scenario/scenario';
import {ChemicalContainer} from '../Chemical_Container';
import {ChemicalData} from '../Chemical_Data';


@Component({
  selector: 'page-chemSelect',
  templateUrl: 'chemSelect.html'
})
export class ChemSelectPage {
  items;
  checkboxes = [];
  selectedChemicals = [];
  chemTest: ChemicalData; //what's this?
  chemTest2 : ChemicalContainer;

  constructor(public navCtrl: NavController, private http: Http) {

    this.chemTest2 = new ChemicalContainer(this.http);
    this.items = this.chemTest2.getChemicalNames();
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

    //Check if at least one box is checked before moving on
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        oneChecked = true;
        this.selectedChemicals.push(item);
      }
    }

    //If everything's good, move on to the next page
    if(oneChecked == true) {
     this.navCtrl.push(ScenarioPage, {
       'data1': this.selectedChemicals,
       'data2': this.chemTest2
     });
   } else {
      alert("At least one chemical must be checked.");
   }
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.items = this.chemTest2.getChemicalNames();

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
