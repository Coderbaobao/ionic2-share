import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppData } from '../../providers/app-data';
import { PersonDetailsPage } from '../person-details/person-details';

@Component({
  selector: 'page-concern',
  templateUrl: 'concern.html'
})
export class ConcernPage {
  userid:string;
  users:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public appData: AppData) {
     this.userid = navParams.get('personid');
  }
  
  ngAfterViewInit() {
      this.appData.getConcernList(this.userid).then(res => {
          this.users = res;            
      }, err => {
          this.users = err;
      })
   }
   goDetail(personID){
     this.navCtrl.push(PersonDetailsPage,{personid:personID});
   }
}
