import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StaffPage } from './staff/staff';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  staff = [
    'Fred Dolislager',
    'Leslie Galloway',
    'Debra Stewart',
    'Katie Noto',
    'Karessa Manning'

  ];
  constructor(public navCtrl: NavController) {

  }

  staffSelected(staffMember: string) {
    //console.log("Selected Item", staffMember);
    this.navCtrl.push(StaffPage, {
      'staffMember': staffMember,
      'staff' : this.staff
    });
  }
}
