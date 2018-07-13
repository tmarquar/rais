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

  constructor (private http: Http, fileName:string) {
    this.readCsvData(fileName);
  }

  initializeChemicalNames() {
     for (let chemical of this.csvData) {
       this._chemicalNames.push(chemical[0]);
     }
  }



  initializeChemicals() {
    for (let row of this.csvData) {
      this._chemicalsMasterList[row[0]] = new ChemicalData();
      this._chemicalsMasterList[row[0]].setChemicalName(row[0]);
      this._chemicalsMasterList[row[0]].setCasnum(row[1]);
      this._chemicalsMasterList[row[0]].setResidentSoil(row[2], row[3]);
      this._chemicalsMasterList[row[0]].setIndustrialSoil(row[4], row[5]);
      this._chemicalsMasterList[row[0]].setResidentTapwater(row[6],row[7]);
      this._chemicalsMasterList[row[0]].setMCL(row[8]);
    }
  }

  private readCsvData(fileName:string) {
  //let http : Http;
  this.http.get(fileName)
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


  // List of all chemicals from Masterlist
  getChemicalNames() : string[] {
      return this._chemicalNames;
  }

  /**********************************************************
  * Access data from each chemical element in the Masterlist.
  *
  ***********************************************************/
  // uses integer instead of string
  // probably not useful
  getChemicalName(index:number) : string {
    return this._chemicalsMasterList[index].getChemicalName();
  }

  getCasnum(chemicalName:string): string {
    return this._chemicalsMasterList[chemicalName].getCasnum();
  }

  getIndustrialSoil(chemicalName:string) : [number,string] {
    return this._chemicalsMasterList[chemicalName].getIndustrialSoil();
  }

  getResidentSoil(chemicalName:string) : [number,string] {
    return this._chemicalsMasterList[chemicalName].getResidentSoil();
  }

  getResidentTapwater(chemicalName:string) : [number,string] {
    return this._chemicalsMasterList[chemicalName].getResidentTapwater();
  }

  getMCL(chemicalName:string) : string {
    return this._chemicalsMasterList[chemicalName].getMCL();
  }
}
