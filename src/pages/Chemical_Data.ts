
export class ChemicalData {
  _chemicalName:string;
  _casnum : string;
  _industrialSoil : [number,string];
  _residentSoil : [number,string];
  _residentTapwater : [number,string];
  _mcl : number;
  //_resident = [];
  //_industrial = [];

  // initialize all data
  constructor () {
    this.setChemicalName("empty");
    this.setCasnum("empty");
    this.setIndustrialSoil(-1,'empty');
    this.setResidentSoil(-1,'empty');
    this.setResidentTapwater(-1,'empty');
    this.setMCL(-1);
  }

  /**************************************************************
  * Make getters and setters for all the data
  *
  *
  ***************************************************************/
  /*initializeChemicalNames() {
    for (let chemical of this.csvData) {
      this._chemicalNames.push(chemical[0]);
    }
  }*/
  setChemicalName(chemicalName : string) : void {
    this._chemicalName = chemicalName;
  }

  getChemicalName() : string {
    return this._chemicalName;
  }

  setCasnum(casnum:string) : void {
    this._casnum = casnum;
  }
  getCasnum() : string {
    return this._casnum;
  }

  setIndustrialSoil (screeningLevel:number , key:string) : void {
    this._industrialSoil = [screeningLevel, key];
  }
  getIndustrialSoil() : [number,string] {
    return this._industrialSoil;
  }

  setResidentSoil (screeningLevel:number , key:string) : void {
    this._residentSoil = [screeningLevel, key];
  }
  getResidentSoil() : [number,string] {
    return this._residentSoil;
  }

  setResidentTapwater (screeningLevel:number , key:string) : void {
    this._residentTapwater = [screeningLevel, key];
  }
  getResidentTapwater() : [number,string] {
    return this._residentTapwater;
  }

  setMCL(mcl:number) : void {
    this._mcl = mcl;
  }
  getMCL() : number {
    return this._mcl;
  }
}
