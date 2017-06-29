import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController,AlertController,LoadingController} from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { TabsPage } from '../tabs/tabs';
import { AppData } from '../../providers/app-data';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {uumbers?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public appData: AppData,public userData: UserData,
   private alert :AlertController,private loading : LoadingController,) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      let uumbers = this.signup.uumbers;
      let password = this.signup.password;
      let data = JSON.stringify({ uumbers, password });
      this.appData.register(data).then(res => {
        let reRegister: any = res;
        if (reRegister.isRegister) {
          this.appData.Login(data).then(res => {
            let reLogon: any = res;
            if (reLogon.isLogon) {
              console.log(reLogon);
              console.log(reLogon.userId);
              let userid = reLogon.userId;
              let loader = this.loading.create({
                content: "请稍候...",
                duration: 1000
              });
              loader.present();
              this.navCtrl.push(TabsPage);
            this.userData.login(userid);
            }
           })
          }
          else{
            let alert = this.alert.create({
                title: '警告',
                subTitle: '已存在用户！ 请再试一次 !',
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
    startApp() {
    this.navCtrl.push(TabsPage).then(() => {
    })
  }
}
