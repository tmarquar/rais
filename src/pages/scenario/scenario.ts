import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';
import { CardsPage } from '../cards/cards';

@Component({
  selector: 'page-ScenarioPage',
  templateUrl: 'scenario.html'
})
export class ScenarioPage {
  scenarios;
  radioButtons = [];
  selectedChemicals = [];
  //Is at least one scenario picked?
  scenarioSelected = false;
  finalScenario;
  chemTest2 : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
    this.initializeRadio();

    this.selectedChemicals = navParams.get('data1');
    this.chemTest2 = navParams.get('data2');
  }

  selectRadio(selectedScenario) {
    for (let scenario of this.scenarios) {
      if(selectedScenario == scenario) {
        this.radioButtons[selectedScenario] = true;
        this.scenarioSelected = true;
        this.finalScenario = selectedScenario;
      } else {
        this.radioButtons[scenario] = false;
      }
    }
  }

  goToOtherPage() {
    if(this.scenarioSelected == true) {
      this.navCtrl.push(CardsPage, {
        'data1': this.finalScenario,
        'data2': this.selectedChemicals,
        'data3': this.chemTest2
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
