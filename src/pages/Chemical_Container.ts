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

  _selectedChemicals:string[] = [];
  _scenario:string[] = [];
  _screeningType:string[] = [];
  _targetRiskHazard:string[] = [];
  _exposureRoutes:string[] = [];
  _screeningTypeOptions:string[] = [];
  _targetRiskHazardOptions:string[] = [];
  _exposureRouteOptions:string[] = [];
  _scenarioOptions:string[] = [];

  constructor (private http: Http, fileName:string) {
    this.readCsvData(fileName);
    this.initializeOptions();
  }

  initializeOptions() {
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

  initializeChemicalNames() : void{
     for (let chemical of this.csvData) {
       this._chemicalNames.push(chemical[0]);
     }
  }

  initializeChemicals() : void {
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

  private extractData(res) : void {
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
  for (let route of this._exposureRouteOptions) {
    if (route === this._targetRiskHazard[0]){
      choices = this._exposureRouteOptions;
    }
    if (route === this._targetRiskHazard[1]){
      choices.push(this._exposureRouteOptions[0]);
      choices.push(this._exposureRouteOptions[2]);
    }
    if (route === this._targetRiskHazard[2]){
      choices.push(this._exposureRouteOptions[0]);
      choices.push(this._exposureRouteOptions[1]);
    }
    if (route === this._targetRiskHazard[3]){
      choices.push(this._exposureRouteOptions[0]);
    }
  }
  let unique = Array.from(new Set(choices));
  //let unique = [...new Set(choices)];
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
  // List of all chemicals from Masterlist
  getChemicalNames() : string[] {
    return this._chemicalNames;
  }

  addScenario(scenario:string):void{
    this._scenario.push(scenario);
  }
  setScenario(scenario:string[]):void {
    this._scenario = scenario;
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
  getScreeningType():string[] {
    return this._screeningType;
  }

  addTargetRiskHazard(targetRiskHazard:string) :void {
    this._targetRiskHazard.push(targetRiskHazard);
  }
  setTargetRiskHazard(targetRiskHazard:string[]) :void{
    this._targetRiskHazard = targetRiskHazard;
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
  getExposureRoutes() : string[]{
    return this._exposureRoutes;

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

  getMCL(chemicalName:string) : number {
    return this._chemicalsMasterList[chemicalName].getMCL();
  }

  /**********************************************************
  * Display data from each chemical element in the proper data set.
  *
  ***********************************************************/
  displayCasNum(chemical:string):string {
    return this.getCasnum(chemical);
  }
  displayResidentSoilLabel(chemical:string):string {
    return "Resident Soil (mg/kg): ";
  }
  displayResidentSoil(chemical:string):string {
    var result : string;
    result = String(this.getResidentSoil(chemical)[0]);
    return result;
  }
  displayResidentSoilKey(chemical:string):string {
    return this.getResidentSoil(chemical)[1];
  }
  displayIndustrialSoil(chemical:string):string {
    var result : string;
    result = String(this.getIndustrialSoil(chemical)[0]);
    return result;
  }
  displayIndustrialSoilKey(chemical:string):string {
    return this.getIndustrialSoil(chemical)[1];
  }
  displayMCL(chemical:string):string {
    var result : string;
    result = String(this.getMCL(chemical));
    return result;
  }
}
