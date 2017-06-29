import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from "@angular/http";
import { NavController,Events,AlertController,LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { AppData } from '../../providers/app-data';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {uumbers?: string, password?: string} = {};
  submitted = false;
  isLogon:boolean;

  constructor(public navCtrl: NavController, public events: Events,public userData: UserData,
  private alert :AlertController,private loading : LoadingController,private http : Http,public appData: AppData) { }

  onLogin(form: NgForm) {
    this.submitted = true;

  if (form.valid) {
      let uumbers = this.login.uumbers;
      let password = this.login.password; 
      let data = JSON.stringify({uumbers, password});
      this.appData.Login(data).then(res => {
       let reLogon :any = res;
          if(reLogon.isLogon)
          { 
            let userid = reLogon.userId;
            let loader = this.loading.create({
                    content: "请稍候...",
                    duration: 1000
                });
                loader.present();
            this.navCtrl.push(TabsPage);
            this.userData.login(userid);
          }
          else{
            let alert = this.alert.create({
                title: '警告',
                subTitle: '错误的用户名或密码！ 请再试一次 !',
                buttons: ['OK']
            });
         alert.present();
          }
        }, err => {
          let alert = this.alert.create({
                title: '警告',
                subTitle: '网络连接错误 !',
                buttons: ['OK']
            });
         alert.present();
      })
    }    
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
   startApp() {
    this.navCtrl.push(TabsPage).then(() => {
    })
  }
}
