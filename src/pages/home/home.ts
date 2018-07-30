import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private toast: Toast) {
    /*
    this.toast.show(`I'm a toast`, '5000', 'top').subscribe(
      toast => {
        console.log(toast);
      }
    );
*/
  }


}
