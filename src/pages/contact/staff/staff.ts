import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html'
})

export class StaffPage {
  staffMember :string;
  staff : string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.staffMember = navParams.get('staffMember');
    this.staff = navParams.get('staff');
  }

}
