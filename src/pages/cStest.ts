/*import { Component } from '@angular/core';
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
//  checkboxes = [];
  checked = [];
//  data : ChemicalContainer;

  constructor(public navCtrl: NavController, private http: Http) {
  //  this.data = new ChemicalContainer(this.http);
  //  this.items = this.data.getChemicalNames();
    this.initializeItems();
    this.initializeCheckboxes();
  }

  initializeCheckboxes() {
    for (let item of this.items) {
      item.checked = false;
    }
  }

//Dummy function
  initializeItems() {
  //  this.data = {
    //    boron: true,
    //    potassium: false
//    };

    this.items = [
      {  text: 'Boron', checked: false},
      {  text: 'Potassium', checked: false}
    ];
  }

  toggleCheckboxes(item) {
      if(item.checked == true) {
        console.log(item.checked);
        console.log(item.text, " is now true.");
        this.checked.push(item.text);
        console.log(item.text, " is now pushed to checked.");

        console.log("Checked looks like this: ");
        for (var i = 0; i < this.checked.length; i++) {
          console.log(this.checked[i]);
        }
      } else {
        console.log(item.checked);
        console.log(item.text, " is now false.");

        var index = this.checked.indexOf(item.text, 0);
        if (index > -1) {
           this.checked.splice(index, 1);
        }

        console.log(item.text, " is now removed from checked.");
        console.log("Checked looks like this: ");
        for (var i = 0; i < this.checked.length; i++) {
        console.log(this.checked[i]);
        }
      }
    //this.checked[item] = !this.checked[item];
  }

  goToOtherPage() {

 }

  getItems(ev) {
    // Reset items back to all of the items
      this.initializeItems();
        var i=0;
        for(let item of this.items) {
          console.log(this.checked[i]);
          if(this.checked[i] == item.text) {
            item.checked = true;
            console.log(item.text, "is now checked.");
          }
          i++;
        }

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.text.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
*/
