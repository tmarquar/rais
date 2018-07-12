import { Http } from '@angular/http';
import { ChemicalData } from './Chemical_Data';
import * as papa from 'papaparse';

export class ChemicalContainer {
  //_chemicals : ChemicalData[];
  //_chosenChemicals = string[];
  csvData:any[] = [];
  headerRow:any[] = [];
  _chemicalNames:string[] = [];
  _chemicalsMasterList: ChemicalData[] = [];

  constructor (private http: Http) {
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

  initializeChemicals() {
    for (let row of this.csvData) {
      this._chemicalsMasterList[row[0]] = new ChemicalData();
      this._chemicalsMasterList[row[0]].setChemicalName(row[0]);

      //console.log(this._chemicalsMasterList[row[0]]);
    //  console.log(chemical[0]);
    //  console.log(chemical[1]);
    //  this._chemicalData.push(chemical[1]);
    }
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
    this.initializeChemicals();
  }


  private handleError(err) {
    console.log('something went wrong: ', err);
  }

  readRMLcsv():void {

  }
}
