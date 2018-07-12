
import * as papa from 'papaparse';
import { Http } from '@angular/http';
import {ChemicalData} from './Chemical_Data';

export class ChemicalContainer {
  //_chemicals : ChemicalData[];
  //_chosenChemicals = string[];
  csvData:any[] = [];
  headerRow:any[] = [];
  _chemicalNames:string[] = [];


  constructor (private http:Http) {
    this.readCsvData();

  }

  initializeChemicalNames() {
    for (let chemical of this.csvData) {

      this._chemicalNames.push(chemical[0]);
    }

  }

  getChemicalNames() : string[] {
    return this._chemicalNames;
  }

  private readCsvData() {
  //let http : Http;
  this.http.get('../assets/csv/RML_1_0.csv')
  .subscribe(
    data => this.extractData(data),
    err => this.handleError(err)
  );
}

private extractData(res) {
  let csvData = res['_body'] || '';
  let parsedData = papa.parse(csvData).data;

  this.headerRow = parsedData[0];
  parsedData.splice(0,1);
  this.csvData = parsedData;
  
  this.initializeChemicalNames();
}


private handleError(err) {
  console.log('something went wrong: ', err);
}


  readRMLcsv():void {



  }
}
