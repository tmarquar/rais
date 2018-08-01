import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

export class SQLiteHandler {

  _chemicals:string[] = [];
  _dataOptions:number[][] = [[],[],[],[]];
  _scenario:string[][] = [];
  _screeningType:string[][] = [];
  _targetRiskHazard:string[][] = [];
  _exposureRoute:string[][] = [];

  temp:any[];

  constructor (private sqlite: SQLite, private _screeningTypeOptions:string[],
    private _targetRiskHazardOptions:string[], private _scenarioOptions:string[],
    private _exposureRouteOptions:string[]){


  }

  processData() :void {
    let screeningTypeInt:number;
    let targetRiskHazardInt:number = 0;
    let scenarioInt:number = 0;
    let exposureRouteInt:number = 0;
    this._screeningType = [];
    this._targetRiskHazard = [];
    this._scenario = [];
    this._exposureRoute = [];
    let index:number = 0;

    for (let i in this._chemicals) {
      screeningTypeInt = this._dataOptions[0][i];
      targetRiskHazardInt = this._dataOptions[1][i];
      scenarioInt = this._dataOptions[2][i];
      exposureRouteInt = this._dataOptions[3][i];
      this._screeningType.push([]);
      this._targetRiskHazard.push([]);
      this._scenario.push([]);
      this._exposureRoute.push([]);
      index = 0;
      while (screeningTypeInt > 0){
        if (screeningTypeInt % 2){
          screeningTypeInt -=1;
          this._screeningType[i].push(this._screeningTypeOptions[index]);
        }
        index++;
        screeningTypeInt = screeningTypeInt / 2;
      }

      index = 0;
      while (targetRiskHazardInt > 0){
        if (targetRiskHazardInt % 2){
          targetRiskHazardInt -=1;
          this._targetRiskHazard[i].push(this._targetRiskHazardOptions[index]);
        }
        index++;
        targetRiskHazardInt = targetRiskHazardInt / 2;
      }

      index = 0;
      while (scenarioInt > 0){
        //console.log("scene: " + scenarioInt);
        if (scenarioInt % 2){
          scenarioInt -=1;
          this._scenario[i].push(this._scenarioOptions[index]);
          //console.log(scenarioInt + this._scenarioOptions[index] + index);
        }
        index++;
        scenarioInt = scenarioInt / 2;
      }

      index = 0;

      while (exposureRouteInt > 0){

        if (exposureRouteInt % 2){
          exposureRouteInt -= 1;

          this._exposureRoute[i].push(this._exposureRouteOptions[index]);
        }
        index++;
        exposureRouteInt = exposureRouteInt / 2;
      }
    }
  }


  loadFavorites() {
   return this.sqlite.create({
    name: 'favoritedb.db',
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
        this.processData();
      }).catch(e => console.log(e));
  }).catch(e => console.log(e));
}

  loadRecents() {
   return this.sqlite.create({
    name: 'recentdb.db',
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
        this.processData();
      }).catch(e => console.log(e));
  }).catch(e => console.log(e));
  }

    loadData() {
     return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
       db.executeSql("CREATE TABLE IF NOT EXISTS favorites(chemical TEXT PRIMARY KEY, screeningType INT, targetRiskHazard INT, scenario INT, exposureRoute INT)", this.temp)
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
         db.executeSql("SELECT * FROM favorites", this.temp)
        .then(res => {
          //console.log("I AM ABOUT TO READ IN DATA");
          this._chemicals = [];
          this._dataOptions = [[],[],[],[]];
          for(var i =0; i<res.rows.length; i++) {
            this._chemicals.push(res.rows.item(i).chemical);
            //console.log(res.rows.item(i).chemical);
            this._dataOptions[0].push(res.rows.item(i).screeningType);
            this._dataOptions[1].push(res.rows.item(i).targetRiskHazard);
            this._dataOptions[2].push(res.rows.item(i).scenario);
            this._dataOptions[3].push(res.rows.item(i).exposureRoute);
          }
          this.processData();
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));
    //console.log("I am at the end of load" + this._chemicals[0]);
    //this.processData();
    //return this._chemicals;
  }

  public saveFavorite(chemical:string, screeningType:string[], targetRiskHazard:string[],scenario:string[], exposureRoute:string[]):void {
    let screeningTypeInt:number = 0;
    let targetRiskHazardInt:number = 0;
    let scenarioInt:number = 0;
    let exposureRouteInt:number = 0;

    let index:number = 0;

    for (let screen of screeningType){
      index = this._screeningTypeOptions.indexOf(screen);
      if (index >= 0 ){
        screeningTypeInt += 2**index;
      }
    }
    index = -1;
    for (let target of targetRiskHazard) {
      index = this._targetRiskHazardOptions.indexOf(target);
      if (index >= 0) {
        targetRiskHazardInt += 2**index;
      }
    }
    index = -1;
    for (let scene of scenario) {
      index = this._scenarioOptions.indexOf(scene);
      if (index >= 0) {
        scenarioInt += 2**index;
      }
    }
    index = -1;
    for (let route of exposureRoute) {
      index = this._exposureRouteOptions.indexOf(route);
      if (index >= 0){
        exposureRouteInt += 2**index;
      }
    }


    this.sqlite.create({
      name: 'favoritedb.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
      db.executeSql('INSERT INTO favorites VALUES(?,?,?,?,?)',[chemical,screeningTypeInt,targetRiskHazardInt,scenarioInt,exposureRouteInt])
      .then(res => {
        console.log(res);
      }).catch(e => console.log('sqlobject error: ' + e));
    }).catch(e => console.log('sqlite error: ' + e));

  }

  async saveRecents(chemicals:string[], screeningType:string[], targetRiskHazard:string[],scenario:string[], exposureRoute:string[])  {
    await this.sqlite.create({
     name: 'recentdb.db',
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
         this.processData();
       }).catch(e => console.log(e));
   }).catch(e => console.log(e));
   
    await this.sqlite.create({
      name: 'recentdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM favorites',this.temp)
      .then(res => {
        console.log(res);
      }).catch(e => console.log(e));
    }).catch (e => console.log(e));


    let screeningTypeInt:number = 0;
    let targetRiskHazardInt:number = 0;
    let scenarioInt:number = 0;
    let exposureRouteInt:number = 0;

    let index:number = 0;

    for (let screen of screeningType){
      index = this._screeningTypeOptions.indexOf(screen);
      if (index >= 0 ){
        screeningTypeInt += 2**index;
      }
    }
    index = -1;
    for (let target of targetRiskHazard) {
      index = this._targetRiskHazardOptions.indexOf(target);
      if (index >= 0) {
        targetRiskHazardInt += 2**index;
      }
    }
    index = -1;
    for (let scene of scenario) {
      index = this._scenarioOptions.indexOf(scene);
      if (index >= 0) {
        scenarioInt += 2**index;
      }
    }
    index = -1;
    for (let route of exposureRoute) {
      index = this._exposureRouteOptions.indexOf(route);
      if (index >= 0){
        exposureRouteInt += 2**index;
      }
    }

    for (let chemical of chemicals) {
      this.sqlite.create({
        name: 'recentdb.db',
        location: 'default'
      }).then((db: SQLiteObject) =>{
        db.executeSql('INSERT INTO favorites VALUES(?,?,?,?,?)',[chemical,screeningTypeInt,targetRiskHazardInt,scenarioInt,exposureRouteInt])
        .then(res => {
          console.log(res);
        }).catch(e => console.log('sqlobject error: ' + e));
      }).catch(e => console.log('sqlite error: ' + e));
    }

  }

  public deleteFavorite(chemicalName:string) : void  {
    if (this._chemicals.indexOf(chemicalName) > -1){
      this.sqlite.create({
        name: 'favoritedb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM favorites WHERE chemical=?',[chemicalName])
        .then(res => {
          console.log(res);
        }).catch(e => console.log(e));
      }).catch (e => console.log(e));

    }
  }

  public deleteRecent(chemicalName:string) : void  {
    if (this._chemicals.indexOf(chemicalName) > -1){
      this.sqlite.create({
        name: 'recentdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM favorites WHERE chemical=?',[chemicalName])
        .then(res => {
          console.log(res);
        }).catch(e => console.log(e));
      }).catch (e => console.log(e));

    }
  }

  getChemicals() {
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
  getExposureRoute(chemical:string):string[] {
    return this._exposureRoute[this._chemicals.indexOf(chemical)];
  }




}
