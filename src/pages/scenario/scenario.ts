import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CardsPage } from '../cards/cards';

@Component({
  selector: 'page-ScenarioPage',
  templateUrl: 'scenario.html'
})
export class ScenarioPage {
  scenarios;
  radioButtons = [];
  selectedChemicals = [];
  scenarioSelected = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
    this.initializeRadio();

    this.selectedChemicals = navParams.get('data');
  }

  selectRadio(selectedScenario) {
    for (let scenario of this.scenarios) {
      if(selectedScenario == scenario) {
        this.radioButtons[selectedScenario] = true;
        this.scenarioSelected = true;
      } else {
        this.radioButtons[scenario] = false;
      }
    }

    /*Debugging
    for (let scenario of this.scenarios) {
      console.log(scenario);
      console.log("=");
      console.log(this.radioButtons[scenario]);
    }
    */
  }

  goToOtherPage() {
    /*Debugging
    for (let i in this.selectedChemicals) {
      console.log(this.selectedChemicals[i]);
    }*/
    if(this.scenarioSelected == true) {
      this.navCtrl.push(CardsPage, {
        'data1': this.radioButtons,
        'data2': this.selectedChemicals
      });
    } else {
        alert("Please select a scenario.");
      }
    }

  initializeRadio() {
    for (let scenario of this.scenarios) {
      this.radioButtons[scenario] = true;
    }
  }

  initializeItems() {
    this.scenarios = [
      'Resident',
      'Industrial'
    ];
  }
}
