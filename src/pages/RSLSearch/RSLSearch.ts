/****************************************************************
* This is the newer version of chemSelect. It links to subdirectories
* in chemSelect for simplicity.
*
*
***************************************************************/
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { ChemicalContainer} from '../Chemical_Container';
import { File } from '@ionic-native/file';
import { SQLite } from '@ionic-native/sqlite';
import { TargetRiskHazardPage } from '../chemSelect/screeningType/targetRiskHazard/targetRiskHazard';
import { CardsPage } from '../chemSelect/screeningType/targetRiskHazard/scenario/exposureRoutes/cards/cards';


@Component({
  selector: 'page-RSLSearch',
  templateUrl: 'RSLSearch.html'
})
export class RSLSearchPage {
  items;
  checkboxes = [];
  searchTerm: string = '';
  data : ChemicalContainer;
  searchToggled: boolean = false;

  // load all the packages we need to pass to ChemicalContainer
  constructor(public navCtrl: NavController, private http: HTTP, private file:File,private sqlite: SQLite, private loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 100
    });
    // somehow, here the page knows to wait for things to load, so it shows the spinner until it is
    // done. Maybe it is something about constructors. I am not sure, but it works, and is easily broken if
    // some things are changed.
    loading.present();
    this.data = new ChemicalContainer(this.http, this.file, this.sqlite); // load
    // Since we cut out a page and know we want RML screening, we insert that infomation here so that ChemicalContainer
    // doesn't have to be changed
    this.data.addScreeningType(this.data.getScreeningTypeOptions()[0]);

    this.items = this.data.getChemicalNames();
    this.initializeCheckboxes();
    this.searchToggled = false;
  }

  initializeCheckboxes() {
    for (let item of this.items) {
      this.checkboxes[item] = false;
    }
  }
  toggleCheckboxes(item) {
    this.checkboxes[item] = !this.checkboxes[item];

  }

  public searchToggle():void {
    this.searchToggled = !this.searchToggled;
  }

  getIcon(item):string{
    if (this.checkboxes[item]){
      return "checkbox-outline";
    }else{
      return "square-outline";
    }
  }

  // if they want all infomation available quickly as if they checked all boxes.
  retrieveAll() {
    var oneChecked: boolean = false;

    this.data.resetSelectedChemicals();
    this.data.clearTargetRiskHazard();
    this.data.clearScenario();
    this.data.clearExposureRoutes();

      //Check if at least one box is checked before moving on
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        oneChecked = true;
        this.data.addChemical(item);

        //populate as if they had selected everything
        this.data.setTargetRiskHazard(this.data.getTargetRiskHazardOptions());
        this.data.setScenario(this.data.getScenarioOptions());
        this.data.setExposureRoutes(this.data.getExposureRouteOptions());
      }
    }

    //If everything's good, move on to the next page
    if(oneChecked == true) {

     this.navCtrl.push(CardsPage, {
       'data': this.data
     });
    } else {
      alert("At least one chemical must be checked.");
     }
   }

  clearAll() {
    this.items = this.data.getChemicalNames();
    this.initializeCheckboxes();
  }

  goToOtherPage() {
    var oneChecked: boolean = false;
    this.data.resetSelectedChemicals();

    //Check if at least one box is checked before moving on
    for (let item of this.items) {
      if(this.checkboxes[item] == true) {
        oneChecked = true;
        this.data.addChemical(item);
      }
    }

    //If everything's good, move on to the next page
    if(oneChecked == true) {
     this.navCtrl.push(TargetRiskHazardPage, {
       'data': this.data
     });
   } else {
      alert("At least one chemical must be checked.");
   }
  }

    // this is for the search bar
    getItems(ev) {
      // Reset items back to all of the items
      this.items = this.data.getChemicalNames();


      // set val to the value of the ev target
      var val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    cancelSearch(ev) {
      this.items = this.data.getChemicalNames();
      this.searchToggled = false;
    }
  }
