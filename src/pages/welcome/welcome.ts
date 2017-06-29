import { Component } from '@angular/core';
import { NavController ,MenuController,Slides} from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'welcome.html'
})
export class WelcomePage {
 showSkip = true;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage
  ) { }

  startApp() {
    this.navCtrl.push(TabsPage).then(() => {
      this.storage.set('hasSeenfirst', 'true');
    })
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // 根左菜单教程页面应该禁用
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
