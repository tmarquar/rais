import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';

import { RSLTHQ10 } from './RSLTHQ10';
import { RSLTHQ01 } from './RSLTHQ01';
import { RMLTHQ10 } from './RMLTHQ10';
import { RMLTHQ30 } from './RMLTHQ30';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { SQLiteHandler } from './sqliteHandler';

export class ChemicalContainer {
  _chemicalNames:string[] = [];
  _selectedChemicals:string[] = [];
  _scenario:string[] = [];
  _screeningType:string[] = [];
  _targetRiskHazard:string[] = [];
  _exposureRoutes:string[] = [];
  _screeningTypeOptions:string[] = [];
  _targetRiskHazardOptions:string[] = [];
  _exposureRouteOptions:string[] = [];
  _scenarioOptions:string[] = [];

  _rslthq10 : RSLTHQ10;
  _rslthq01 : RSLTHQ01;
  _rmlthq10 : RMLTHQ10;
  _rmlthq30 : RMLTHQ30;

  _favoriteData : SQLiteHandler;

  constructor (private http: HTTP, private file: File, private sqlite: SQLite) {
    this.initializeOptions();

    this._rslthq10 = new RSLTHQ10(this.http, this.file, this._exposureRouteOptions, this._scenarioOptions);
    this._rslthq01 = new RSLTHQ01(this.http, this.file,this._exposureRouteOptions, this._scenarioOptions);
    this._rmlthq10 = new RMLTHQ10(this.http, this.file,this._exposureRouteOptions, this._scenarioOptions);
    this._rmlthq30 = new RMLTHQ30(this.http, this.file,this._exposureRouteOptions, this._scenarioOptions);
    //var prom = wait(2000);
    //this._chemicalNames = ['this', 'adf'];
    this._chemicalNames = this._rslthq10.getChemicalList();

    this._favoriteData = new SQLiteHandler(this.sqlite, this._screeningTypeOptions,this._targetRiskHazardOptions, this._scenarioOptions, this._exposureRouteOptions);
    this._favoriteData.loadData();
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
* favorite handling
*
**************************************************************/
public getFavoriteChemicals() : string[] {
  //this._favoriteData.loadData();
  return this._favoriteData.getChemicals();
}

public addFavorite(chemical:string) :void {
  this._favoriteData.saveData(chemical, this._screeningType, this._targetRiskHazard, this._scenario, this._exposureRoutes);
}

public deleteFavorite(chemical:string) : void {
  this._favoriteData.deleteData(chemical);
}

public getFavoriteFormattedData(chemical:string) : string[] {
  let targetRiskHazard = this._favoriteData.getTargetRiskHazard(chemical);
  let output:string[] = [];
  for (let level of targetRiskHazard) {
    if (level === this._targetRiskHazardOptions[0]){
      output = output.concat(this._rslthq10.getFormattedData(this._favoriteData.getScenario(chemical),this._favoriteData.getExposureRoute(chemical),chemical));
    }
    if (level === this._targetRiskHazardOptions[1]){
      output = output.concat(this._rslthq01.getFormattedData(this._favoriteData.getScenario(chemical),this._favoriteData.getExposureRoute(chemical),chemical));
    }
    if (level === this._targetRiskHazardOptions[2]){
      output = output.concat(this._rmlthq10.getFormattedData(this._favoriteData.getScenario(chemical),this._favoriteData.getExposureRoute(chemical),chemical));
    }
    if (level === this._targetRiskHazardOptions[3]){
      output = output.concat(this._rmlthq30.getFormattedData(this._favoriteData.getScenario(chemical),this._favoriteData.getExposureRoute(chemical),chemical));
    }
  }
  return output;
  //return this._rslthq10.getFormattedData(this._scenario,this._exposureRoutes,chemical);
  //return ['1234','1231'];
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
