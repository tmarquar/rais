import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';
import { CardsPage } from '../cards/cards';
import {ChemicalData} from '../Chemical_Data';

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
  chemicalData : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
    this.initializeRadio();

    this.selectedChemicals = navParams.get('selectedChemicals');
    this.chemicalData = navParams.get('chemicalData');
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
        'finalScenario': this.finalScenario,
        'selectedChemicals': this.selectedChemicals,
        'chemicalData': this.chemicalData
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
