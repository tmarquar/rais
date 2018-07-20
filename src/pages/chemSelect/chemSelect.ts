import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { ScreeningTypePage } from './screeningType/screeningType';
import { ChemicalContainer} from '../Chemical_Container';
//import { File } from '@ionic-native/file';

@Component({
  selector: 'page-chemSelect',
  templateUrl: 'chemSelect.html'
})
export class ChemSelectPage {
  items;
  checkboxes = [];
  checked = [];
  data : ChemicalContainer;
  test:string;

  constructor(public navCtrl: NavController, private http: HTTP) {
    this.data = new ChemicalContainer(this.http);
    //var prom = wait(3000);
    this.items = this.data.getChemicalNames();
    this.initializeCheckboxes();
    this.test = this.data.getTest();
  }

  initializeCheckboxes() {
    for (let item of this.items) {
      this.checkboxes[item] = false;
    }
  }

  toggleCheckboxes(item) {
    this.test = this.data.getTest();
    if(!this.checkboxes[item]) {
      this.checkboxes[item] = true;
      //console.log(item, " is now true.");
      this.checked.push(item);
      //console.log(item, " is now pushed to checked.");

      //console.log("Checked looks like this: ");
      for (var i = 0; i < this.checked.length; i++) {
        //console.log(this.checked[i]);
      }
    } else {
      this.checkboxes[item] = false;
      //console.log(item, " is now false.");

      var index = this.checked.indexOf(item, 0);
      if (index > -1) {
         this.checked.splice(index, 1);
      }

      //console.log(item, " is now removed from checked.");
      //console.log("Checked looks like this: ");
      for (var i = 0; i < this.checked.length; i++) {
        //console.log(this.checked[i]);
      }
    }
    //this.checked[item] = !this.checked[item];
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
    for(let item of this.items) {
    //  if(this.checked[item] == item) {
    //    console.log("Hello");
        //this.checkboxes[item] = true;
    //  }
    }

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
