
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
    this.initializeChemicalNames();
  }

  initializeChemicalNames() {
    this._chemicalNames = [
      'Amsterdam',
      'Bogota',
      'Buenos Aires',
      'Cairo',
      'Dhaka',
      'Edinburgh',
      'Geneva',
      'Genoa',
      'Glasglow',
      'Hanoi',
      'Hong Kong',
      'Islamabad',
      'Istanbul',
      'Jakarta',
      'Kiel',
      'Kyoto',
      'Le Havre',
      'Lebanon',
      'Lhasa',
      'Lima',
      'London',
      'Los Angeles',
      'Madrid',
      'Manila',
      'New York',
      'Olympia',
      'Oslo',
      'Panama City',
      'Peking',
      'Philadelphia',
      'San Francisco',
      'Seoul',
      'Taipeh',
      'Tel Aviv',
      'Tokio',
      'Uelzen',
      'Washington'
    ];
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
}


private handleError(err) {
  console.log('something went wrong: ', err);
}


  readRMLcsv():void {



  }
}
