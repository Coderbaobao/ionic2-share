import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {ChatPage} from "../chat/chat";
import {AccountPage} from "../account/account";
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  
  tab1Root:any = HomePage;
  tab2Root:any = ChatPage;
  tab3Root:any = AccountPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
 
  }
}
