/*import { Http } from '@angular/http';
import * as papa from 'papaparse';

export class RSLTHQ10 {
  csvData:any[] = [];
  headerRow:any[] = [];

  _chemicalNames:string[] = [] ;
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
      this._chemicalNames[row[0]] = row[0];
      this._casnum[row[0]] = row[1];
      this._residentSoil[row[0]] = [row[2], row[3]];
      this._industrialSoil[row[0]] = [row[4], row[5]];
      this._residentAir[row[0]] = [row[6],row[7]];
      this._industrialAir[row[0]] = [row[8],row[9]];
      this._residentTapwater[row[0]] = [row[10],row[11]];
      this._tapwaterMCL[row[0]] = row[12];
      this._tapwaterSSL[row[0]] = row[13];
      this._sslKey[row[0]] = row[14];
      this._tapwaterMCLSSL[row[0]] = row[15];

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

/***********************************************************************
* This function will return an array of strings that can be directly printed
* to the card.
************************************************************************/

  // There is probably a better way to do this.
  // Maybe a more dynamic way or getting data.
  // Make it only for loops, without if statements

  public getFormattedData (scenario:string[], routes:string[], chemical:string) : string[] {
    formattedData : string[] = [];
    for (let scene of scenario) {
      if (scene === this._scenarioOptions[0]) { // Resident
        for (let route of routes) {
          if (route === this._exposureRouteOptions[0]) { // Soil
            formattedData.push(scene + ' ' + route + ': ' + _residentSoil[chemical][0] + ', ' + _residentSoil[chemical][1]);
          }
          if (route === this._exposureRouteOptions[1]) { // Tapwater
            formattedData.push(scene + ' ' + route + ': ' + _residentTapwater[chemical][0] + ', ' + _residentTapwater[chemical][1]);
          }
          if (route === this._exposureRouteOptions[2]) { // Air
            formattedData.push(scene + ' ' + route + ': ' + _residentAir[chemical][0] + ', ' + _residentAir[chemical][1]);
          }
          if (route === this._exposureRouteOptions[3]) { // Tap SSL
            formattedData.push(scene + ' ' + route + ': ' + _tapwaterSSL[chemical][0] + ', ' + _tapwaterSSL[chemical][1]);
          }
          if (route === this._exposureRouteOptions[4]) { // Tap MCL
            formattedData.push(scene + ' ' + route + ': ' + _tapwaterMCL[chemical][0] + ', ' + _tapwaterMCL[chemical][1]);
          }
          if (route === this._exposureRouteOptions[5]) { // Tap MCL SSL
            formattedData.push(scene + ' ' + route + ': ' + _tapwaterMCLSSL[chemical][0] + ', ' + _tapwaterMCLSSL[chemical][1]);
          }
        }
      }
      if (scene === this._scenarioOptions[1]) { // Industrial
        for (let route of routes) {
          if (route === this._exposureRouteOptions[0]) { // Soil
            formattedData.push(scene + ' ' + route + ': ' + _industrialSoil[chemical][0] + ', ' + _industrialSoil[chemical][1]);
          }
          if (route === this._exposureRouteOptions[2]) { // Air
            formattedData.push(scene + ' ' + route + ': ' + _industrialAir[chemical][0] + ', ' + _industrialAir[chemical][1]);
          }
        }
      }
    }
    return formattedData;
  }

  public getChemicalList () : string[] {
    return this._chemicalNames;
  }

}
*/
