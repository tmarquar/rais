/*import { Http } from '@angular/http';
import * as papa from 'papaparse';

export class RSLTHQ10 {
  csvData:any[] = [];
  headerRow:any[] = [];

  _chemicalName:string[] = [] ;
  _casnum : string[] = [];

  _industrialSoil : [number,string][] = [];
  _industrialAir : [number,string][] = [];

  _residentSoil : [number,string][] = [];
  _residentAir : [number,string][] = [];
  _residentTapwater:[number,string][] = [];

  _tapwaterMCL : number[] = [];
  _tapwaterMCLSSL : number[] = [];
  _tapwaterSSL : number[] = [];
  _sslKey : string[] = [];

  _exposureRouteOptions:string[] = [];
  _scenarioOptions:string[] = [];

  // initialize all data
  constructor (private http: Http, routeOptions:string[], scenarioOptions:string[]) {
    this.readCsvData('../csv/RSL_1_0.csv');
    this._exposureRouteOptions = routeOptions;
    this._scenarioOptions = scenarioOptions;

  }

  private initializeChemicals() : void {
    for (let row of this.csvData) {
      //this._chemicalsMasterList[row[0]] = new ChemicalData();
      this._chemicalName[row[0]].push(row[0]);
      this._casnum[row[0]].push(row[1]);
      this._residentSoil[row[0]].push([row[2], row[3]]);
      this._industrialSoil[row[0]].push([row[4], row[5]]);
      this._residentAir[row[0]].push([row[6],row[7]]);
      this._industrialAir[row[0]].push([row[8],row[9]]);
      this._residentTapwater[row[0]].push([row[10],row[11]]);
      this._tapwaterMCL[row[0]].push(row[12]);
      this._tapwaterSSL[row[0]].push(row[13]);
      this._sslKey[row[0]].push(row[14]);
      this._tapwaterMCLSSL[row[0]].push(row[15]);

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

  private extractData(res) : void {
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;

    this.headerRow = parsedData[0];
    parsedData.splice(0,1);
    this.csvData = parsedData;

    this.initializeChemicals();
  }

  private handleError(err) {
    console.log('something went wrong: ', err);
  }

  // Do we want to pass the options arrays so that we don't make direct comparisons?
  public getData (scenario:string[], route:string[], chemical:string) : string[] {

  }


}
*/
