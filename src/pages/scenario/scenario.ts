import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-ScenarioPage',
  templateUrl: 'scenario.html'
})
export class ScenarioPage {
  scenarios;
  radioButtons = [];

  constructor(public navCtrl: NavController) {
    this.initializeItems();
    this.initializeRadio();
  }

  selectRadio(selectedScenario) {
    for (let scenario of this.scenarios) {
      if(selectedScenario == scenario) {
        this.radioButtons[selectedScenario] = true;
      } else {
        this.radioButtons[scenario] = false;
      }
    }

    for (let scenario of this.scenarios) {
      console.log(scenario);
      console.log("=");
      console.log(this.radioButtons[scenario]);
    }
  }

  goToOtherPage() {
  /*  this.navCtrl.push(ScenarioPage, {
      data: this.radioButtons
    });
  }
  */
  console.log("go to the next page!");
  }

  initializeRadio() {
    for (let scenario of this.scenarios) {
      this.radioButtons[scenario] = false;
    }
  }

  initializeItems() {
    this.scenarios = [
      'Resident',
      'Industrial'
    ];
  }
}