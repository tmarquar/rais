import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScenarioPage } from '../scenario/scenario';
import {ChemicalContainer} from '../Chemical_Container.ts';
import {ChemicalData} from '../Chemical_Data.ts';


@Component({
  selector: 'page-chemSelect',
  templateUrl: 'chemSelect.html'
})
export class ChemSelectPage {
  items;
  checkboxes = [];
  chemTest: ChemicalData;
  chemTest2 : ChemicalContainer;

  constructor(public navCtrl: NavController) {
    this.initializeItems();
    this.initializeCheckboxes();
    this.chemTest2 = new ChemicalContainer;
    this.chemTest2.readRMLcsv();
  }

  initializeCheckboxes() {
    for (let item of this.items) {
      this.checkboxes[item] = false;
    }
  }

  toggleCheckboxes(item) {
    this.checkboxes[item] = !this.checkboxes[item];
    /*Debugging
    console.log(this.checkboxes[item]);
    */
  }

  goToOtherPage() {
    var oneChecked: boolean = false;

    /*Debugging
    for(let item of this.items) {
        console.log(item);
        console.log("=");
        console.log(this.checkboxes[item]);
    } */

    //Check if at least one box is checked before moving on
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        oneChecked = true;
      }
    }

    //If everything's good, move on to the next page
    if(oneChecked == true) {
     this.navCtrl.push(ScenarioPage, {
       data: this.checkboxes
     });
   } else {
      alert("At least one chemical must be checked.");
   }
  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'Buenos Aires',
      'Cairo',
      /*
      'Dhaka',
      'Edinburgh',
      'Geneva',
      'Genoa',
      'Glasglow',
      'Hanoi',
      'Hong Kong',
      'Islamabad',
      'Istanbul',
      'Jakarta',
      'Kiel',
      'Kyoto',
      'Le Havre',
      'Lebanon',
      'Lhasa',
      'Lima',
      'London',
      'Los Angeles',
      'Madrid',
      'Manila',
      'New York',
      'Olympia',
      'Oslo',
      'Panama City',
      'Peking',
      'Philadelphia',
      'San Francisco',
      'Seoul',
      'Taipeh',
      'Tel Aviv',
      'Tokio',
      */
      'Uelzen',
      'Washington'
    ];
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

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
