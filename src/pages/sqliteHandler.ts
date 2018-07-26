import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

export class SQLiteHandler {

  _chemicals:string[] = [];
  _dataOptions:number[][] = [[],[],[],[]];
  _scenario:string[][] = [];
  _screeningType:string[][] = [];
  _targetRiskHazard:string[][] = [];
  _exposureRoutes:string[][] = [];


  constructor (private sqlite: SQLite, private _screeningTypeOptions:string[],
    private _targetRiskHazardOptions:string[], private _scenarioOptions:string[], private _exposureRouteOptions:string[]) {

    this.loadData();
  }

  loadData():void {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("CREATE TABLE IF NOT EXISTS favorites(chemical TEXT PRIMARY KEY, screeningType INT, targetRiskHazard INT, scenario INT, exposureRoute INT)", this.temp)
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
        db.executeSql("SELECT * FROM favorites", this.temp)
        .then(res => {
          this._chemicals = [];
          this._dataOptions = [[],[],[],[]];
          for(var i =0; i<res.rows.length; i++) {
            this._chemicals.push(res.rows.item(i).chemical);
            this._dataOptions[0].push(res.rows.item(i).screeningType);
            this._dataOptions[1].push(res.rows.item(i).targetRiskHazard);
            this._dataOptions[2].push(res.rows.item(i).scenario);
            this._dataOptions[3].push(res.rows.item(i).exposureRoute);
          }
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));

  }

  saveData(chemical:string, screeningType:string[], targetRiskHazard:string[],scenario:string[], exposureRoute:string[]):void {
    let screeningTypeInt:number = 0;
    let targetRiskHazardInt:number = 0;
    let scenarioInt:number = 0;
    let exposureRouteInt:number = 0;

    let index:number = 0;

    for (let screen of screeningType){
      index = this._screeningTypeOptions.indexOf(screen);
       // indexOf returns -1 if not found. but should always be found
      if (index >= 0 ){
        screeningTypeInt += 2**index;
      }
    }


    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
      db.executeSql('INSERT INTO favorites VALUES(?,?,?,?,?)',[chemical,scenario,sample])
      .then(res => {
        console.log(res);
      }).catch(e => console.log(e));
    }).catch(e => console.log(e));


  }

  deleteData(chemicalName:string) : void  {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM favorites WHERE chemical=?',[chemicalName])
      .then(res => {
        console.log(res);
      }).catch(e => console.log(e));
    }).catch (e => console.log(e));

    this.loadData();
  }

  getChemicals():string[] {
    return this._chemicals;
  }
  getScenario(chemical:string): string[] {
    return this._scenario[this._chemicals.indexOf(chemical)];
  }
  getScreeningType(chemical:string):string[] {
    return this._screeningType[this._chemicals.indexOf(chemical)];
  }
  getTargetRiskHazard(chemical:string):string[] {
    return this._targetRiskHazard[this._chemicals.indexOf(chemical)];
  }
  getExposureRoutes(chemical:string):string[] {
    return this._exposureRoutes[this._chemicals.indexOf(chemical)];
  }


}
