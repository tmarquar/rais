import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html'
})

export class StaffPage {
  staffMember :string;
  staff : string[] = [];
  staffEmail : string[] = [];
  staffTitle : string[] = [];
  staffDescription: string[] = [];
  staffPhone: string[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.staffMember = navParams.get('staffMember');
    this.staff = navParams.get('staff');
    this.initializeEmail();
    this.initializeTitle();
    this.initializeDescription();
    this.initializePhone();
  }

  getTitle (name:string) : string {
    return this.staffTitle[name];
  }

  getEmail(name:string) : string {
    return this.staffEmail[name];
  }

  getPhone(name:string) : string {
    return this.staffPhone[name];
  }

  getDescription(name:string) : string {
    return this.staffDescription[name];
  }

  private initializePhone () : void {
    this.staffPhone['Fred Dolislager'] = '865-576-5451';
    this.staffPhone['Leslie Galloway'] = '865-574-7906';
    this.staffPhone['Debra Stewart'] = '865-576-5450';
    //this.staffPhone['Katie Noto'] = '###-###-####';
    //this.staffPhone['Karessa Manning'] = '###-###-####';
  }

  private initializeTitle () : void {

    this.staffTitle['Fred Dolislager'] = 'Program and Content Manager, Trainer';
    this.staffTitle['Leslie Galloway'] = 'Web Master, Database Manager, and Tool Developer; Trainer';
    this.staffTitle['Debra Stewart'] = 'QA/QC; Trainer';
    this.staffTitle['Katie Noto'] = 'Web Developer';
    this.staffTitle['Karessa Manning'] = 'Environmental Risk Analyst';

  }

  private initializeEmail () : void {
    this.staffEmail['Fred Dolislager'] = 'fdolislager@utk.edu';
    this.staffEmail['Leslie Galloway'] = 'i65@ornl.gov';
    this.staffEmail['Debra Stewart'] = 'dstewart@utk.edu';
    this.staffEmail['Katie Noto'] = 'boluska@ornl.gov';
    this.staffEmail['Karessa Manning'] = 'manningkl@ornl.gov';
  }

  private initializeDescription () : void {
    this.staffDescription['Fred Dolislager'] = 'Fred is the principle contact for the RAIS and coordinates 13 similar web-based tools for the US EPA spanning chemical and radiological risk issues. His extensive involvement with Superfund risk assessment tools enable the RAIS project to be instantly aware of any changes in US EPA guidance or toxicity values. Fred has a B.S. in Natural Science and 24 hours of graduate work at the University of TN.';
    this.staffDescription['Leslie Galloway'] = 'Leslie is the principal developer for the RAIS and coordinates many web-based tools for the US EPA spanning chemical and radiological risk issues. She also manages several databases for research programs at the University of Tennessee and Oak Ridge National Laboratory. Leslie has a B.S. in Business Adminstration, Finance and and M.S. in Statistics from the University of Tennessee, Knoxville.';
    this.staffDescription['Debra Stewart'] = 'Debra has been the lead quality assurance/quality control (QA/QC) manager for the RAIS. Her many other roles have included: Procedure development, web design, training and toxicity database maintenance. Debra has a B.S. in Environmental Science and Resource Management from Lehigh University.';
    this.staffDescription['Katie Noto'] = 'Katie is a developer for the RAIS and 13 similar web-based tools for the US EPA spanning chemical and radiological risk issues. Katie has a B.A. in Mathematics and Computer Science from Maryville College.';
    this.staffDescription['Karessa Manning'] = 'Karessa coordinates the quality assurance/quality control (QA/QC) for calculator outputs, develops equations, and updates user guide text for the RAIS and supports 13 similar web-based tools for the US EPA spanning chemical and radiological risk issues. She updates and maintains current data for toxicity values and chemical parameters. Karessa graduated from the Univeristy of Tennessee, Knoxville with a B.S. in Geology and Environmental Studies.';

   }

}
