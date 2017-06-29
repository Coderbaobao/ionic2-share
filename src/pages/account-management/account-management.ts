import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';
import { ChangePasswordPage } from '../change-password/change-password';

@Component({
  selector: 'page-account-management',
  templateUrl: 'account-management.html'
})
export class AccountManagementPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData,
  ) { }

  changePassword() {
    this.navCtrl.push(ChangePasswordPage);
  }
  logout() {
    this.userData.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
