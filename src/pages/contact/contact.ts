import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  items = [
    'Fred Dolislager',
    'Leslie Galloway',
    'Debra Stewart',
    'Katie Noto',
    'Karessa Manning'

  ];
  constructor(public navCtrl: NavController) {

  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }
}
