import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChemicalContainer } from '../Chemical_Container';
import { ScenarioPage } from '../scenario/scenario';
import { ChemicalData} from '../Chemical_Data';

@Component({
  selector: 'page-FilePage',
  templateUrl: 'fileSelect.html'
})
export class FileSelectPage {
  files;
  radioButtons = [];
  selectedChemicals = [];
  //Is at least one radio button picked?
  fileSelected = false;
  finalFile;
  finalLevel;
  RML_10Data : ChemicalContainer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
    this.initializeRadio();

    this.selectedChemicals = navParams.get('selectedChemicals');
    this.RML_10Data = navParams.get('RML_10Data');
    this.finalLevel = navParams.get('finalLevel');
  }

  selectRadio(selectedFile) {
    for (let file of this.files) {
      if(selectedFile == file) {
        this.radioButtons[selectedFile] = true;
        this.fileSelected = true;
        this.finalFile = selectedFile;
      } else {
        this.radioButtons[file] = false;
      }
    }
  }

  goToOtherPage() {
    if(this.fileSelected == true) {
      this.navCtrl.push(ScenarioPage, {
        'finalFile': this.finalFile,
        'finalLevel': this.finalLevel,
        'selectedChemicals': this.selectedChemicals,
        'RML_10Data': this.RML_10Data
      });
    } else {
        alert("Please select an option.");
      }
    }

  initializeRadio() {
    for (let file of this.files) {
      this.radioButtons[file] = false;
    }
  }

  initializeItems() {
    this.files = [
      'Target Risk: 1E-6 and File Quotient: 1.0',
      'Target Risk: 1E-6 and File Quotient: 0.1',
      'Target Risk: 1E-4 and File Quotient: 1.0',
      'Target Risk: 1E-4 and File Quotient: 3.0',
    ];
  }
}
