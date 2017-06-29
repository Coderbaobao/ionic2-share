import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeService } from "../../providers/nativeService";
import {AppVersion} from '@ionic-native/app-version';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  versionNo: string;
  first : boolean = true;
  constructor(public navCtrl: NavController, private appVersion: AppVersion,public navParams: NavParams,private nativeService: NativeService) {
   if (this.nativeService.isMobile()) {
        this.nativeService.getVersionNumber().then(value => {
        this.versionNo = value;
      });
    }
}
    checkNewVersion() {
    this.nativeService.detectionUpgrade(this.first);
  }
}
