import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';

import { RSLData } from './RSLData';

import { RMLData } from './RMLData';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { SQLiteHandler } from './sqliteHandler';

export class ChemicalContainer {
  _chemicalNames:string[] = [];
  _chemicalCasnums:string[]=[];
  _selectedChemicals:string[] = [];
  _scenario:string[] = [];
  _screeningType:string[] = [];
  _targetRiskHazard:string[] = [];
  _exposureRoutes:string[] = [];
  _screeningTypeOptions:string[] = [];
  _targetRiskHazardOptions:string[] = [];
  _exposureRouteOptions:string[] = [];
  _scenarioOptions:string[] = [];

  _rslthq10 : RSLData;
  _rslthq01 : RSLData;
  _rmlthq10 : RMLData;
  _rmlthq30 : RMLData;

  _sqlData : SQLiteHandler;

  constructor (private http: HTTP, private file: File, private sqlite: SQLite) {
    this.initializeOptions();

    this._rslthq10 = new RSLData(this.http, this.file, this._exposureRouteOptions, this._scenarioOptions, true);
    this._rslthq01 = new RSLData(this.http, this.file,this._exposureRouteOptions, this._scenarioOptions, false);
    this._rmlthq10 = new RMLData(this.http, this.file,this._exposureRouteOptions, this._scenarioOptions, true);
    this._rmlthq30 = new RMLData(this.http, this.file,this._exposureRouteOptions, this._scenarioOptions, false);
    //var prom = wait(2000);
    //this._chemicalNames = ['this', 'adf'];
    this._chemicalNames = this._rslthq10.getChemicalList();
    this._chemicalCasnums=this._rslthq10.getChemicalCasnum();
    this._sqlData = new SQLiteHandler(this.sqlite, this._screeningTypeOptions,this._targetRiskHazardOptions, this._scenarioOptions, this._exposureRouteOptions);
    
  }
/*
  getTest() :string{
    console.log(this.test);
    return this._rslthq10.getTest();
    //return this.test;
  }
*/
  initializeOptions() :void  {
    this._screeningTypeOptions = [
      'RSL (Regional Screening Levels)',
      'RML (Regional Removal Management Levels)'
    ];

    this._targetRiskHazardOptions = [
      'Target Risk: 1E-6 and Hazard Quotient: 1.0',
      'Target Risk: 1E-6 and Hazard Quotient: 0.1',
      'Target Risk: 1E-4 and Hazard Quotient: 1.0',
      'Target Risk: 1E-4 and Hazard Quotient: 3.0'
    ];

    this._scenarioOptions = [
      'Resident',
      'Industrial'
    ];

    this._exposureRouteOptions = [
      'Soil',
      'Tapwater',
      'Air',
      'Soil to Groundwater',
      'Tapwater (MCL)',
      'Soil to Groundwater (MCL)'
    ];

  }

/**************************************************************
* favorite handling and recent handling
*
**************************************************************/
public loadFavorites() { // I wanted to try and return the promise here.

  return this._sqlData.loadFavorites();
}

public loadRecents(){
  return this._sqlData.loadRecents();
}

public loadChemicalData(chemical:string) : void {
  //this._chemicalNames = this._sqlData.getChemicals();
  //this._selectedChemicals = this._sqlData.getChemicals();
  this._scenario = this._sqlData.getScenario(chemical);
  this._screeningType = this._sqlData.getScreeningType(chemical);
  this._targetRiskHazard = this._sqlData.getTargetRiskHazard(chemical);
  this._exposureRoutes = this._sqlData.getExposureRoute(chemical);
}

public getFavoriteChemicals() : string[] {
  //this._sqlData.loadData();
  return this._sqlData.getChemicals();
}

public getSavedChemicals() : string[] {
  return this._sqlData.getChemicals();
}

public addFavorite(chemical:string) :void {
  this._sqlData.saveFavorite(chemical, this._screeningType, this._targetRiskHazard, this._scenario, this._exposureRoutes);
}

public addRecents() : void {
  this._sqlData.saveRecents(this._selectedChemicals, this._screeningType, this._targetRiskHazard, this._scenario, this._exposureRoutes);
}

public deleteFavorite(chemical:string) : void {
  this._sqlData.deleteFavorite(chemical);
}

public deleteRecent(chemical:string) : void {
  this._sqlData.deleteRecent(chemical);
}

public getFavoriteFormattedData(chemical:string) : string[] {
  let targetRiskHazard = this._sqlData.getTargetRiskHazard(chemical);
  let output:string[] = [];
  for (let level of targetRiskHazard) {
    if (level === this._targetRiskHazardOptions[0]){
      output = output.concat(this._rslthq10.getFormattedData(this._sqlData.getScenario(chemical),this._sqlData.getExposureRoute(chemical),chemical));
    }
    if (level === this._targetRiskHazardOptions[1]){
      output = output.concat(this._rslthq01.getFormattedData(this._sqlData.getScenario(chemical),this._sqlData.getExposureRoute(chemical),chemical));
    }
    if (level === this._targetRiskHazardOptions[2]){
      output = output.concat(this._rmlthq10.getFormattedData(this._sqlData.getScenario(chemical),this._sqlData.getExposureRoute(chemical),chemical));
    }
    if (level === this._targetRiskHazardOptions[3]){
      output = output.concat(this._rmlthq30.getFormattedData(this._sqlData.getScenario(chemical),this._sqlData.getExposureRoute(chemical),chemical));
    }
  }
  return output;
  //return this._rslthq10.getFormattedData(this._scenario,this._exposureRoutes,chemical);
  //return ['1234','1231'];
}

public getSQLFormattedData(chemical:string) : string[] {
  let targetRiskHazard = this._sqlData.getTargetRiskHazard(chemical);
  let output:string[] = [];
  for (let level of targetRiskHazard) {
    if (level === this._targetRiskHazardOptions[0]){
      output = output.concat(this._rslthq10.getFormattedData(this._sqlData.getScenario(chemical),this._sqlData.getExposureRoute(chemical),chemical));
    }
    if (level === this._targetRiskHazardOptions[1]){
      output = output.concat(this._rslthq01.getFormattedData(this._sqlData.getScenario(chemical),this._sqlData.getExposureRoute(chemical),chemical));
    }
    if (level === this._targetRiskHazardOptions[2]){
      output = output.concat(this._rmlthq10.getFormattedData(this._sqlData.getScenario(chemical),this._sqlData.getExposureRoute(chemical),chemical));
    }
    if (level === this._targetRiskHazardOptions[3]){
      output = output.concat(this._rmlthq30.getFormattedData(this._sqlData.getScenario(chemical),this._sqlData.getExposureRoute(chemical),chemical));
    }
  }
  return output;
}



/*************************************************************
* Functions for output
*
**************************************************************/
  public getFormattedData(chemical:string) : string[] {
    let output:string[] = [];
    for (let level of this._targetRiskHazard) {
      if (level === this._targetRiskHazardOptions[0]){
        output = output.concat(this._rslthq10.getFormattedData(this._scenario,this._exposureRoutes,chemical));
      }
      if (level === this._targetRiskHazardOptions[1]){
        output = output.concat(this._rslthq01.getFormattedData(this._scenario,this._exposureRoutes,chemical));
      }
      if (level === this._targetRiskHazardOptions[2]){
        output = output.concat(this._rmlthq10.getFormattedData(this._scenario,this._exposureRoutes,chemical));
      }
      if (level === this._targetRiskHazardOptions[3]){
        output = output.concat(this._rmlthq30.getFormattedData(this._scenario,this._exposureRoutes,chemical));
      }
    }
    return output;
    //return this._rslthq10.getFormattedData(this._scenario,this._exposureRoutes,chemical);
    //return ['1234','1231'];
  }
  public getAllFormattedData(chemical:string) : string[] {
    let output:string[] = [];
    output = output.concat(this._rslthq10.getAllFormattedData(chemical));
    output = output.concat(this._rslthq01.getAllFormattedData(chemical));
    output = output.concat(this._rmlthq10.getAllFormattedData(chemical));
    output = output.concat(this._rmlthq30.getAllFormattedData(chemical));
    return output;
    //return this._rslthq10.getAllFormattedData(chemical);

  }



/***************************************************************
* functions so that we get the options that we want
*
*
*****************************************************************/

  public getScreeningTypeOptions() :string[]{
    return this._screeningTypeOptions;
  }

  // get the options for target risk after selecting screeningType
  public getTargetRiskHazardOptions() :string[]{
    let choices:string[] = [];
    for (let type of this._screeningType) {
      if (type === this._screeningTypeOptions[0]){
        choices.push(this._targetRiskHazardOptions[0]);
        choices.push(this._targetRiskHazardOptions[1]);
      }
      if (type === this._screeningTypeOptions[1]){
        choices.push(this._targetRiskHazardOptions[2]);
        choices.push(this._targetRiskHazardOptions[3]);
      }
    }
    return choices;
  }

  // get the scenario options after selecting target risk
  public getExposureRouteOptions(): string[]{
  let choices:string[] = [];
  for (let type of this._targetRiskHazard) {
    if (type === this._targetRiskHazardOptions[0] || type == this._targetRiskHazardOptions[1]){
      for (let scenario of this._scenario){
        if (scenario === this._scenarioOptions[0]){
          //choices = this._exposureRouteOptions;
          choices.push(this._exposureRouteOptions[0]);
          choices.push(this._exposureRouteOptions[1]);
          choices.push(this._exposureRouteOptions[4]);
          choices.push(this._exposureRouteOptions[2]);
          choices.push(this._exposureRouteOptions[3]);
          choices.push(this._exposureRouteOptions[5]);

        }
        if (scenario === this._scenarioOptions[1]) {
          choices.push(this._exposureRouteOptions[0]);
          choices.push(this._exposureRouteOptions[2]);
        }
      }
    }
    if (type === this._targetRiskHazardOptions[2] || type === this._targetRiskHazardOptions[3]){
      for (let scenario of this._scenario){
        if (scenario === this._scenarioOptions[0]){
          choices.push(this._exposureRouteOptions[0]);
          choices.push(this._exposureRouteOptions[1]);
          choices.push(this._exposureRouteOptions[4]);
        }
        if (scenario === this._scenarioOptions[1]) {
          choices.push(this._exposureRouteOptions[0]);
        }
      }

    }
  }
  let unique = Array.from(new Set(choices));
  //console.log("hello");
  return unique;
  }

  public getScenarioOptions() : string[] {
    return this._scenarioOptions;
  }

  /*******************************************************************
  * Handle scenario information. Each is an array so that all information
  * can be selected.
  *
  *
  *********************************************************************/
  addChemical(chemical:string) : void {
    this._selectedChemicals.push(chemical);
  }
  getSelectedChemicals() :string[]{

    return this._selectedChemicals;
  }
  resetSelectedChemicals() : void {
    this._selectedChemicals = [];
  }
  setSelectedChemicals(selectedChemicals:string[]) : void {
    this._selectedChemicals = selectedChemicals;
  }
  // List of all chemicals
  getChemicalNames() : string[] {
  // was trying to remove the empty last item in the list.
  //this._chemicalNames.splice(-1,1);

    return this._chemicalNames;
  }

  getChemicalNameAndCasnum(): string[]{
    let chemicalNameAndCasnum:string[] =[];
    for(let i in this._chemicalNames) {
      chemicalNameAndCasnum.push(this._chemicalNames[i] + ' ' + this._chemicalCasnums[i]);
    }
    return chemicalNameAndCasnum;
  }

  addScenario(scenario:string):void{
    this._scenario.push(scenario);
  }
  setScenario(scenario:string[]):void {
    this._scenario = scenario;
  }
  clearScenario():void {
    this._scenario = [];
  }
  getScenario() :string[] {
    return this._scenario;
  }

  addScreeningType(screeningType:string) :void {
    this._screeningType.push(screeningType);
  }
  setScreeningType(screeningType:string[]):void {
    this._screeningType = screeningType;
  }
  clearScreeningType():void {
    this._screeningType = [];
  }
  getScreeningType():string[] {
    return this._screeningType;
  }

  addTargetRiskHazard(targetRiskHazard:string) :void {
    this._targetRiskHazard.push(targetRiskHazard);
  }
  setTargetRiskHazard(targetRiskHazard:string[]) :void{
    this._targetRiskHazard = targetRiskHazard;
  }
  clearTargetRiskHazard() :void{
    this._targetRiskHazard = [];
  }
  getTargetRiskHazard() :string[]{
    return this._targetRiskHazard;
  }

  addExposureRoute(media:string) :void {
      this._exposureRoutes.push(media);
  }
  setExposureRoutes(exposureRoutes:string[]):void {
      this._exposureRoutes = exposureRoutes;
  }
  clearExposureRoutes():void {
      this._exposureRoutes = [];
  }
  getExposureRoutes() : string[]{
    return this._exposureRoutes;

  }

}
