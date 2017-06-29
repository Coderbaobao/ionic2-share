import { Component } from '@angular/core';
import { Platform ,NavController,ViewController,App,ToastController,Events} from 'ionic-angular';
import { NativeService } from "../providers/nativeService";
import { Storage } from '@ionic/storage';
import { AppState } from './app.global';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { TabsPage } from '../pages/tabs/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { Helper } from "../providers/helper";

@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  rootPage:any;
  cssClass:string;
  first :boolean;
  private backpressed:boolean = false;
  constructor( 
    public platform: Platform,
    public storage: Storage,
    private app:App, 
    private splashScreen: SplashScreen,
    private events: Events,
    public toastCtrl:ToastController, 
    public global: AppState,
    private helper: Helper,
    private message:DomSanitizer,
    private nativeService: NativeService) {
  
   this.hasSeenfirst();

  }
  hasSeenfirst(){
  this.storage.get('hasSeenfirst')
      .then((hasSeenfirst) => {
        if (hasSeenfirst) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = WelcomePage;
        }
        this.platformReady();
      })
  }
  platformReady() {
    this.helper.initJpush();//初始化极光推送
     this.storage.get('userid').then((userid) => {
        if (userid) {
          this.events.publish('user:login', userid);
          this.helper.setTags();
          this.helper.setAlias(userid);
        } else {
         
        }
      });
    this.storage.set('hasTheme', false);    
    this.platform.ready().then(() => {
      this.global.set('theme', '');
      this.assertNetwork();//检测网络
      this.nativeService.detectionUpgrade(this.first==false);//检测app是否升级
      this.nativeService.statusBarStyleDefault();
      this.splashScreen.hide();
      this.platform.registerBackButtonAction(() => {
        let nav:NavController = this.app.getActiveNav();
        let view:ViewController = nav.getActive();
        if (view && view.enableBack()) {
          view.dismiss();
          return;
        }
        if (!this.backpressed) {
          this.backpressed = true;
          this.showToast();
          setTimeout(() => this.backpressed = false, 2000);
          return;
        }
         this.platform.exitApp();
      });
    });
  }
  

  showToast(){
      let toast = this.toastCtrl.create({
            message: '再点击一次推出应用',
            duration: 2000,
            position: 'bottom',
            cssClass:'danger'      
          });
          toast.present();
    }
  assertNetwork(){
    if (!this.nativeService.isConnecting()) {
      this.toastCtrl.create({
        message: '未检测到网络,请连接网络',
        showCloseButton: true,
        closeButtonText: '确定'
      }).present();
    }
  }
}
