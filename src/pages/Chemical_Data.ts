
export class ChemicalData {
  _casnum : string;
  _industrialSoil : [number,string];
  _industrialTapwater : [number,string];
  _residentSoil : [number,string];
  _residentTapwater : [number,string];
  //_resident = [];
  //_industrial = [];

  // initialize all data
  constructor () {
    this.setCasnum("empty");
    this.setIndustrialSoil(-1,'empty');
    this.setResidentSoil(-1,'empty');
    this.setIndustrialTapwater(-1,'empty');
    this.setResidentTapwater(-1,'empty');

  }

  /**************************************************************
  * Make getters and setters for all the data
  *
  *
  ***************************************************************/

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

  setIndustrialTapwater (screeningLevel:number , key:string) : void {
    this._industrialTapwater = [screeningLevel, key];
  }
  getIndustrialTapwater() : [number,string] {
    return this._industrialTapwater;
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


}
