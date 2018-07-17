import { Http } from '@angular/http';
import * as papa from 'papaparse';

export class RSLTHQ10 {
  csvData:any[] = [];
  headerRow:any[] = [];

  _myMap: {[key:string]:number} = {};
  _chemicalNames:string[] = [] ;
  //_chemicalsMasterList: {[name:string] :string;} = {};
  _chemicalsMasterList: string[] = [];

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
    this.readCsvData('../assets/csv/RSL_1_0.csv');
    this._exposureRouteOptions = routeOptions;
    this._scenarioOptions = scenarioOptions;

  }

  private initializeChemicals() : void {
    let i:number = 0;
    for (let row of this.csvData){
      this._chemicalNames.push(row[0]);
      this._myMap[row[0]] = i;
      i++;
    }
  //console.log(this._myMap['Copper Cyanide']);
    for (let row of this.csvData) {
      //this._chemicalsMasterList[name] =row[0];
      this._casnum.push(row[1]);
      this._residentSoil.push([row[2], row[3]]);
      this._industrialSoil.push([row[4], row[5]]);
      this._residentAir.push([row[6],row[7]]);
      this._industrialAir.push([row[8],row[9]]);
      this._residentTapwater.push([row[10],row[11]]);
      this._tapwaterMCL.push(row[12]);
      this._tapwaterSSL.push(row[13]);
      this._sslKey.push(row[14]);
      this._tapwaterMCLSSL.push(row[15]);
    }


    /*
    for (let name of this._chemicalNames)
    {
      for (let row of this.csvData) {
        this._chemicalsMasterList[name] =row[0];
        this._casnum[name] = row[1];
        this._residentSoil[name] = [row[2], row[3]];
        this._industrialSoil[name] = [row[4], row[5]];
        this._residentAir[name] = [row[6],row[7]];
        this._industrialAir[name] = [row[8],row[9]];
        this._residentTapwater[name] = [row[10],row[11]];
        this._tapwaterMCL[name] = row[12];
        this._tapwaterSSL[name] = row[13];
        this._sslKey[name] = row[14];
        this._tapwaterMCLSSL[name] = row[15];
      }
    }
    */
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

  public getFormattedData (scenario:string[], routes:string[], chemicalName:string) : string[] {
    let chemical : number = this._myMap[chemicalName];
    let formattedData : string[] = [];
    formattedData.push('CAS No.: ' + this._casnum[chemical]);
    //console.log(chemicalName);

    //console.log(chemical);
    //console.log(this._casnum[chemical]);

    for (let scene of scenario) {
      if (scene === this._scenarioOptions[0]) { // Resident
        for (let route of routes) {
          if (route === this._exposureRouteOptions[0]) { // Soil
            formattedData.push(scene + ' ' + route + ': ' + this._residentSoil[chemical][0] + ', ' + this._residentSoil[chemical][1]);
          }
          if (route === this._exposureRouteOptions[1]) { // Tapwater
            formattedData.push(scene + ' ' + route + ': ' + this._residentTapwater[chemical][0] + ', ' + this._residentTapwater[chemical][1]);
          }
          if (route === this._exposureRouteOptions[2]) { // Air
            formattedData.push(scene + ' ' + route + ': ' + this._residentAir[chemical][0] + ', ' + this._residentAir[chemical][1]);
          }
          if (route === this._exposureRouteOptions[3]) { // Tap SSL
            formattedData.push(scene + ' ' + route + ': ' + this._tapwaterSSL[chemical][0] + ', ' + this._tapwaterSSL[chemical][1]);
          }
          if (route === this._exposureRouteOptions[4]) { // Tap MCL
            formattedData.push(scene + ' ' + route + ': ' + this._tapwaterMCL[chemical][0] + ', ' + this._tapwaterMCL[chemical][1]);
          }
          if (route === this._exposureRouteOptions[5]) { // Tap MCL SSL
            formattedData.push(scene + ' ' + route + ': ' + this._tapwaterMCLSSL[chemical][0] + ', ' + this._tapwaterMCLSSL[chemical][1]);
          }
        }
      }
      if (scene === this._scenarioOptions[1]) { // Industrial
        for (let route of routes) {
          if (route === this._exposureRouteOptions[0]) { // Soil
            formattedData.push(scene + ' ' + route + ': ' + this._industrialSoil[chemical][0] + ', ' + this._industrialSoil[chemical][1]);
          }
          if (route === this._exposureRouteOptions[2]) { // Air
            formattedData.push(scene + ' ' + route + ': ' + this._industrialAir[chemical][0] + ', ' + this._industrialAir[chemical][1]);
          }
        }
      }
    }
    return formattedData;
  }

  public getAllFormattedData (chemicalName:string) : string[] {
    let chemical : number = this._myMap[chemicalName];
    let formattedData : string[] = [];
    formattedData.push('CAS No.: ' + this._casnum[chemical]);
    formattedData.push(scene + ' ' + route + ': ' + this._residentSoil[chemical][0] + ', ' + this._residentSoil[chemical][1]);
    formattedData.push(scene + ' ' + route + ': ' + this._residentTapwater[chemical][0] + ', ' + this._residentTapwater[chemical][1]);
    formattedData.push(scene + ' ' + route + ': ' + this._residentAir[chemical][0] + ', ' + this._residentAir[chemical][1]);
    formattedData.push(scene + ' ' + route + ': ' + this._tapwaterSSL[chemical][0] + ', ' + this._tapwaterSSL[chemical][1]);
    formattedData.push(scene + ' ' + route + ': ' + this._tapwaterMCL[chemical][0] + ', ' + this._tapwaterMCL[chemical][1]);
    formattedData.push(scene + ' ' + route + ': ' + this._tapwaterMCLSSL[chemical][0] + ', ' + this._tapwaterMCLSSL[chemical][1]);
    formattedData.push(scene + ' ' + route + ': ' + this._industrialSoil[chemical][0] + ', ' + this._industrialSoil[chemical][1]);
    formattedData.push(scene + ' ' + route + ': ' + this._industrialAir[chemical][0] + ', ' + this._industrialAir[chemical][1]);
    return formattedData;
  }

  public getChemicalList () : string[] {
    //console.log(this._chemicalNames[0]);
    //return this._chemicalsMasterList;
    //console.log(this._chemicalsMasterList['Chrysene']);
    return this._chemicalNames;
  }

}
