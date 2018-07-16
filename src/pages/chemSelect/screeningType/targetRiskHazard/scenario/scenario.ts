import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../../../../Chemical_Container';
import { CardsPage } from './cards/cards';

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
  finalFile;
  finalLevel;
  RML_10Data : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
    this.initializeRadio();

    this.selectedChemicals = navParams.get('selectedChemicals');
    this.RML_10Data = navParams.get('RML_10Data');
    this.finalLevel = navParams.get('finalLevel');
    this.finalFile = navParams.get('finalFile');
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
        'finalLevel': this.finalLevel,
        'finalFile': this.finalFile,
        'selectedChemicals': this.selectedChemicals,
        'RML_10Data': this.RML_10Data
      });
    } else {
        alert("Please select a scenario.");
      }
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
