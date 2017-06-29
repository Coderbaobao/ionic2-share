import { Component,ViewChild } from '@angular/core';
import { NavController,Content,AlertController,ModalController } from 'ionic-angular';
import { ReleasePage } from '../../pages/release/release';
import { AppData } from '../../providers/app-data';
import { PersonDetailsPage} from "../../pages/person-details/person-details";
import { HomeDetailPage} from "../../pages/home-detail/home-detail";
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../../pages/login/login';
import { GalleryModal } from '../../components/gallery-modal/gallery-modal/gallery-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 private posts:any;
 private dataFinish: boolean = false;
 private hasErr: boolean = false;
 private hasLike: boolean =false;
 private isLike :string="";
 private arr:Array<any> = [];
  private photos:string;
  private hasMore: boolean;
  private one: boolean =true;
  private number :number = 6
  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl: NavController,public data: AppData,public userData: UserData,
    public alertCtrl: AlertController,private modalCtrl: ModalController) { 
  }
 ionViewDidLoad() {
    setTimeout(() => {
      this.initData();
    }, 1000)
  }
  initData() {
    this.hasErr = false;
    this.dataFinish = false;
    this.data.getHttpDynamicService().then(res => {
      this.posts = res;  
        this.hasMore = true;
      this.dataFinish = true; 
    }, err => {
      this.hasErr = true;
    })
   }
   initLists(number){
      this.data.getHttpDynamicList(number).then(res => {
         let data:any = res;
         for (var i = 0; i < data.length ; i++) {
           this.posts.push({
             content: data[i].content,
             id: data[i].id,
             image: data[i].image,
             likes: data[i].likes,
             messageNumber: data[i].messageNumber,
             personID: data[i].personID,
             personNickname: data[i].personNickname,
             userImage: data[i].userImage,
             publishDateTime: data[i].publishDateTime,
           }); 
          } 
          if(data.length == 6){
            this.hasMore = true;
            this.number = this.number + 6;
            this.one = true;
          }else{
            this.hasMore = false;
            this.one = false;
          }
    }, err => {
      this.hasErr = true;
    })
   }
 
  doRefresh(refresher) {
    setTimeout(() => {
    this.initData();
    this.hasMore = true;
    this.one = true;
    this.number =  6;
      refresher.complete();
    }, 2000);
  }
  doInfinite(infiniteScroll) {
    console.log(this.one);
    
    if(this.one ){
        this.initLists(this.number);
      setTimeout(() => {
        infiniteScroll.complete();
      }, 3000);
    }  
  }

  likeAdd(post){
       this.arr.push(post.id);  
       this.arr.forEach(element => {
           if(post.id == element)
           {
             this.hasLike = true;
             this.isLike = element;
           }
           else{
             this.hasLike = false;
           }
          }); 
      setTimeout(() => {
        let peid = post.personID;
        let toid = post.id;
        let data = JSON.stringify({ peid, toid });
        this.data.postAddLikes_dy(data).then(res => {
        }, err => {
        })
      }, 2000)
  }
  
  likesRe(post){
      this.isLike ="";
       this.hasLike = false;
      setTimeout(() => {
        let peid = post.personID;
        let toid = post.id;
        let data = JSON.stringify({ peid, toid });
        this.data.postReLikes_dy(data).then(res => {
        }, err => {
        })
      }, 2000)
  }
  comment(dynaimicID){
     this.navCtrl.push(HomeDetailPage,{ dynaimicID:dynaimicID});
  }
  oepenRe() {
    this.userData.getUserid().then((userid) => {
      if (userid)
        this.navCtrl.push(ReleasePage);
      else {
        let alert = this.alertCtrl.create({
          title: '请登录',
          buttons: ['取消']
        });
        alert.addButton({
          text: '确定',
          handler: () => {
            this.navCtrl.push(LoginPage);
          }
        });
        alert.present();
      }
    });
  }

  userdetail(personID){
  this.navCtrl.push(PersonDetailsPage,{ personid:personID});
 }
 gotoTop() {
    this.content.scrollToTop();
  }
private openModal(image) {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: image,
      initialSlide: 1, // The second image
    });
    modal.present();
  }
}
