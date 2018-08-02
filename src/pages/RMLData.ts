/******************************************************
* This loads and parses data and returns that information gathered.
*
*
*****************************************************/
import { HTTP } from '@ionic-native/http';
import * as papa from 'papaparse';
import { File } from '@ionic-native/file';

export class RMLData {
  csvData:any[] = [];
  headerRow:any[] = [];

  _myMap: {[key:string]:number} = {}; // used for finding index of chemical name in list
  _chemicalNames:string[] = [] ;

  _casnum : string[] = [];

  _industrialSoil : [number,string][] = [];

  _residentSoil : [number,string][] = [];
  _residentTapwater:[number,string][] = [];

  _tapwaterMCL : number[] = [];

  _exposureRouteOptions:string[] = [];
  _scenarioOptions:string[] = [];
  // Hazard Quotient
  _HQ:string; // this is a string that fills in the header for the cards

  // initialize all data
  constructor (private http: HTTP, private file: File,routeOptions:string[], scenarioOptions:string[], RML10:boolean) {
    if (RML10){
      this.readCsvData('www/assets/csv/RML_1_0.csv');
      this._HQ = '1.0';
    } else {
      this.readCsvData('www/assets/csv/RML_3_0.csv');
      this._HQ = '3.0';
    }
    this._exposureRouteOptions = routeOptions;
    this._scenarioOptions = scenarioOptions;

  }

  private initializeChemicals() : void {
    // build map
    let i:number = 0;
    for (let row of this.csvData){
      this._chemicalNames.push(row[0]);
      this._myMap[row[0]] = i;
      i++;
    }
    for (let row of this.csvData) {
      this._casnum.push(row[1]);
      this._residentSoil.push([row[2], row[3]]);
      this._industrialSoil.push([row[4], row[5]]);
      this._residentTapwater.push([row[6],row[7]]);
      this._tapwaterMCL.push(row[8]);
    }
  }


  //read in data
  private readCsvData(fileName:string) {
  /* for use in web app
  this.http.get(fileName,{} ,{})
  .then(
    data => { //console.log(data.data);
      this.extractData(data.data);
    })
    .catch(error => {
      this.handleError(error.error)});
    */
    const fs:string = this.file.applicationDirectory;
    this.file.readAsText(fs,fileName)
    .then(
      data => {
        this.extractData(data);
      })
      .catch(error => {
        this.handleError(error)});


  }

  // parse data
  private extractData(res) : void {
    let parsedData = papa.parse(res).data;

    this.headerRow = parsedData[0];
    parsedData.splice(0,1); // removes first row of labels
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

  // this is for the card
  public getFormattedData (scenario:string[], routes:string[], chemicalName:string) : string[] {
    let chemical : number = this._myMap[chemicalName];
    let formattedData : string[] = [];
    formattedData.push('************************');
    formattedData.push('RML: Target Risk: 1E-4');
    formattedData.push('Hazard Quotient: ' + this._HQ);
    formattedData.push('************************');
    formattedData.push('CAS No.: ' + this._casnum[chemical]);


    for (let scene of scenario) {
      if (scene === this._scenarioOptions[0]) { // Resident
        for (let route of routes) {
          if (route === this._exposureRouteOptions[0]) { // Soil
            formattedData.push(scene + ' ' + route + ': ' + this._residentSoil[chemical][0] + ' (mg/kg), ' + this._residentSoil[chemical][1]);
          }
          if (route === this._exposureRouteOptions[1]) { // Tapwater
            formattedData.push(scene + ' ' + route + ': ' + this._residentTapwater[chemical][0] + ' (ug/L), ' + this._residentTapwater[chemical][1]);
          }
          if (route === this._exposureRouteOptions[4]) { // Tap MCL
            formattedData.push(scene + ' ' + route + ': ' + this._tapwaterMCL[chemical] + ' (ug/L)');
          }
        }
      }
      if (scene === this._scenarioOptions[1]) { // Industrial
        for (let route of routes) {
          if (route === this._exposureRouteOptions[0]) { // Soil
            formattedData.push(scene + ' ' + route + ': ' + this._industrialSoil[chemical][0] + ' (mg/kg), ' + this._industrialSoil[chemical][1]);
          }
        }
      }
    }
    formattedData.push(' ');
    return formattedData;
  }

  // this is for the more info
  public getAllFormattedData (chemicalName:string) : string[] {
    let chemical : number = this._myMap[chemicalName];
    let formattedData : string[] = [];
    formattedData.push('************************');
    formattedData.push('RML: Target Risk: 1E-4');
    formattedData.push('Hazard Quotient: ' + this._HQ);
    formattedData.push('************************');
    formattedData.push('CAS No.: ' + this._casnum[chemical]);
    formattedData.push('Resident Soil: ' + this._residentSoil[chemical][0] + ' (mg/kg), ' + this._residentSoil[chemical][1]);
    formattedData.push('Industrial Soil: ' + this._industrialSoil[chemical][0] + ' (mg/kg), ' + this._industrialSoil[chemical][1]);
    formattedData.push('Resident Tapwater: ' + this._residentTapwater[chemical][0] + ' (ug/L), ' + this._residentTapwater[chemical][1]);
    formattedData.push('Tapwater MCL: ' + this._tapwaterMCL[chemical]) + ' (ug/L)';

    formattedData.push(' ');
    return formattedData;
  }

  public getChemicalList () : string[] {
    return this._chemicalNames;
  }

}
