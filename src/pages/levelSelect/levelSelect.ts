import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';
import { FileSelectPage } from '../fileSelect/fileSelect';
import {ChemicalData} from '../Chemical_Data';

@Component({
  selector: 'page-LevelSelectPage',
  templateUrl: 'levelSelect.html'
})
export class LevelSelectPage {
  levels;
  radioButtons = [];
  selectedChemicals = [];
  //Is at least one scenario picked?
  levelSelected = false;
  finalLevel;
  RML_10Data : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
    this.initializeRadio();

    this.selectedChemicals = navParams.get('selectedChemicals');
    this.RML_10Data = navParams.get('RML_10Data');
  }

  selectRadio(selectedLevel) {
    for (let level of this.levels) {
      if(selectedLevel == level) {
        this.radioButtons[selectedLevel] = true;
        this.levelSelected = true;
        this.finalLevel = selectedLevel;
      } else {
        this.radioButtons[level] = false;
      }
    }
  }

  goToOtherPage() {
    if(this.levelSelected == true) {
      this.navCtrl.push(FileSelectPage, {
        'finalLevel': this.finalLevel,
        'selectedChemicals': this.selectedChemicals,
        'RML_10Data': this.RML_10Data
      });
    } else {
        alert("Please select an option.");
      }
    }

  initializeRadio() {
    for (let level of this.levels) {
      this.radioButtons[level] = true;
    }
  }

  initializeItems() {
    this.levels = [
      'RSL (Regional Screening Levels)',
      'RML (Regional Removal Management Levels)'
    ];
  }
}
