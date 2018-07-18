import { Http } from '@angular/http';
import { ChemicalData } from './Chemical_Data';
import { RSLTHQ10 } from './RSLTHQ10';
import * as papa from 'papaparse';

export class ChemicalContainer {
  _chemicalNames:string[] = [];
<<<<<<< HEAD
  _chemicalsMasterList: ChemicalData[] = [];
  _selectedChemicals = [];
  _scenario;
  _regionalLevel;
  _screeningTyoe;
  _targetRiskHazard;
  _exposureRoute;
=======
>>>>>>> eb9091249eb07d6a6af6f1a9b1eedab1b728f503

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

  constructor (private http: Http) {
    this.initializeOptions();
    this._rslthq10 = new RSLTHQ10(this.http,this._exposureRouteOptions, this._scenarioOptions);
    this._chemicalNames = this._rslthq10.getChemicalList();

  }

<<<<<<< HEAD
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
=======
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

    this._exposureRouteOptions = [
      'Soil',
      'Tapwater',
      'Air',
      'Tap SSL',
      'Tap MCL',
      'Tap MCL SSL'
    ];

    this._scenarioOptions = [
      'Resident',
      'Industrial'
    ];

  }

/*************************************************************
* Functions for output
*
**************************************************************/
  public getFormattedData(chemical:string) : string[] {
    //let formattedData:string[] = [];
    //console.log(chemical);
    return this._rslthq10.getFormattedData(this._scenario,this._exposureRoutes,chemical);
    //return ['1234','1231'];
>>>>>>> eb9091249eb07d6a6af6f1a9b1eedab1b728f503
  }
  public getAllFormattedData(chemical:string) : string[] {
    return this._rslthq10.getAllFormattedData(chemical);

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

<<<<<<< HEAD
  private handleError(err) {
    console.log('something went wrong: ', err);
  }

  addChemical(chemical) {
    this._selectedChemicals.push(chemical);
  }
  getSelectedChemicals() {
    return _selectedChemicals;
  }

  // List of all chemicals from Masterlist
  getChemicalNames() : string[] {
      return this._chemicalNames;
  }
  setScenario(scenario) {
    this._scenario = scenario;
  }
  getScenario() {
    return this._scenario;
  }
  setRegionalLevel(regionalLevel) {
    this._regionalLevel = regionalLevel;
  }
  getRegionalLevel() {
    return this._regionalLevel;
  }
  setScreeningType(screeningType) {
    this._screeningType = screeningType;
  }
  getScreeningLevel() {
    return this._screeningType;
  }
  setTargetRiskHazard(targetRiskHazard) {
    this._targetRiskHazard = targetRiskHazard;
  }
  getTargetRiskHazard() {
    return this._targetRiskHazard;
  }
  setExposureRoute(exposureRoute) {
      this._exposureRoute = exposureRoute;
  }
  getExposureRoute() {
    return this._exposureRoute;
  }
  /**********************************************************
  * Access data from each chemical element in the Masterlist.
=======
  // get the scenario options after selecting target risk
  public getExposureRouteOptions(): string[]{
  let choices:string[] = [];
  for (let type of this._screeningType) {
    if (type === this._screeningTypeOptions[0]){
      for (let scenario of this._scenario){
        if (scenario === this._scenarioOptions[0]){
          choices = this._exposureRouteOptions;
        }
        if (scenario === this._scenarioOptions[1]) {
          choices.push(this._exposureRouteOptions[0]);
          choices.push(this._exposureRouteOptions[2]);
        }
      }
    }
    if (type === this._screeningTypeOptions[1]){
      for (let scenario of this._scenario){
        if (scenario === this._scenarioOptions[0]){
          choices.push(this._exposureRouteOptions[0]);
          choices.push(this._exposureRouteOptions[1]);
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
>>>>>>> eb9091249eb07d6a6af6f1a9b1eedab1b728f503
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

<<<<<<< HEAD
  /**********************************************************
  * Display data from each chemical element in the proper data set.
  *
  ***********************************************************/
  displayCasNum(chemical):string {
    return this.data.getCasnum(chemical);
  }
  displayResidentSoilLabel(chemical):string {
    return "Resident Soil (mg/kg): ";
  }
  displayResidentSoil(chemical):string {
    var result : string;
    result = String(this.data.getResidentSoil(chemical)[0]);
    return result;
  }
  displayResidentSoilKey(chemical):string {
    return this.data.getResidentSoil(chemical)[1];
  }
  displayIndustrialSoil(chemical):string {
    var result : string;
    result = String(this.data.getIndustrialSoil(chemical)[0]);
    return result;
  }
  displayIndustrialSoilKey(chemical):string {
    return this.data.getIndustrialSoil(chemical)[1];
  }
  displayMCL(chemical):string {
    var result : string;
    result = String(this.data.getMCL(chemical));
    return result;
  }
=======
>>>>>>> eb9091249eb07d6a6af6f1a9b1eedab1b728f503
}
