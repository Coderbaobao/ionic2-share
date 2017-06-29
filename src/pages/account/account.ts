import { Component } from '@angular/core';
import { AppState } from '../../app/app.global';
import { NavController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { AppData } from '../../providers/app-data';
import { Storage } from '@ionic/storage';
import { SettingPage } from '../setting/setting';
import { AccountDataPage } from '../account-data/account-data';
import { AccountManagementPage } from '../account-management/account-management';
import { AboutPage } from '../about/about';
import { LoginPage } from '../login/login';
import { ConcernPage } from '../concern/concern';
import { PersonDetailsPage } from "../../pages/person-details/person-details";

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  data:any;
  users:any;
  username: string;
  hasLogon:boolean;
  istheme:boolean = false;
  imageUrl_1: string = 'assets/img/background/background1.jpg';
  imageUrl_2: string = 'assets/img/background/background2.jpg';
  NOuser = {
    name: '请登录',
    userpicture: 'assets/img/portrait/wu.png',
    concern: 0,
    followers: 0,
    likes: 0
  }

  constructor(
    public nav: NavController, public userData: UserData,
    public storage: Storage,public global: AppState,
    public appData: AppData) {

  }
  
  GetloginPerson(userid){
    this.appData.getHttpDynamicDetailsPerson(userid).then(res => {
        this.users = res;
         this.hasLogon =true;
        }, err => {
          this.hasLogon =false;
          this.users = err;
      })
  }

 //主题
 changeTheme(theme) {
   if(!theme)
   {
     this.global.set('theme', theme);
     this.istheme=false; 
     this.storage.set('hasTheme', false);    
    console.log(this.istheme);
    
   }
    else
    {
      this.global.set('theme', theme);
      this.istheme=true;
      this.storage.set('hasTheme', true);
      console.log(this.istheme);
    }
  }
 

  getUumbers() {
    this.userData.getUserid().then((userid) => {
       this.GetloginPerson(userid);
    });
  }
  userdetail(personID){
  this.nav.push(PersonDetailsPage,{ personid:personID});
 }
  goConcern(id){
     this.nav.push(ConcernPage,{ personid:id});
  }
  openStting(){
    this.nav.push(SettingPage);
  }
    
  accountData(){
    this.nav.push(AccountDataPage,{ userInfo:this.users});
  }
    
  accountManagement(){
    this.nav.push(AccountManagementPage);
  }
  openAbout(){
    this.nav.push(AboutPage);
  }
   openLogin(){
    this.nav.push(LoginPage);
  }

  ionViewCanEnter(){  
       this.getUumbers();
    }  

}
