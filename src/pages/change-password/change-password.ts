import { Component } from '@angular/core';
import { Http} from "@angular/http";
import { NavController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AppData } from '../../providers/app-data';
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
  change: {passwordOld?: string, passwordNew1?: string,passwordNew2?: string} = {}; 
  submitted = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userData: UserData,
  private alert :AlertController,private loading : LoadingController,private http : Http,public appData: AppData) {}

onChange(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.getUserid().then((userid) => { 
      let passwordOld = this.change.passwordOld;
      let passwordNew = this.change.passwordNew2; 
      let data = JSON.stringify({userid, passwordOld, passwordNew});
      this.appData.ChangePassword(data).then(res => {
       let redata :any = res;  
          if(redata.ischange)
          { 
            let loader = this.loading.create({
                    content: "修改成功！",
                    duration: 1000
                });
                loader.present();
               this.userData.logout();
               this.navCtrl.setRoot(LoginPage);
          }
          else{
            let alert = this.alert.create({
                title: '警告',
                subTitle: '原密码不正确,请再试一次 !',
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
     });
    }    
  }
}
