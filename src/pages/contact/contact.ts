/*****************************************************
* Information on where to contact us. I would like
* to have this have a built in messenger service
* someday .
**************************************************/

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StaffPage } from './staff/staff';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  fred = 'Fred Dolislager';
  constructor(public navCtrl: NavController) {

  }

  staffSelected(staffMember: string) {
    this.navCtrl.push(StaffPage, {
      'staffMember': staffMember,
      'staff' : this.fred
    });
  }
}
