import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html'
})

export class StaffPage {
  staffMember :string;
  staff : string[];
  staffEmail : string[];
  staffTitle : string[];
  description: string[];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.staffMember = navParams.get('staffMember');
    this.staff = navParams.get('staff');
    this.initializeEmail();
    this.initializeTitle();
    this.initializeDescription();
  }


  private initializeTitle () : void {
    staffTitle['Fred Dolislager'] = "Program and Content Manager; Trainer";
    staffTitle['Leslie Galloway'] = "Web Master, Database Manager, and Tool Developer; Trainer";
    staffTitle['Debra Stewart'] = "QA/QC; Trainer";
    staffTitle['Katie Noto'] = "Web/Software Developer";
    staffTitle['Karessa Manning'] = "Environmental Risk Analyst";
  }

  private initializeEmail () : void {
    staffEmail['Fred Dolislager'] = "fdolislager@utk.edu";
    staffEmail['Leslie Galloway'] = ""
  }

  private initializeDescription () : void {

  }

}
