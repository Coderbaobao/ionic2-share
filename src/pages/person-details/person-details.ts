import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Content,AlertController, } from 'ionic-angular';
import { AppData } from '../../providers/app-data';
import { HomeDetailPage} from "../../pages/home-detail/home-detail";
import { UserData } from '../../providers/user-data';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-person-details',
  templateUrl: 'person-details.html'
})
export class PersonDetailsPage {
   @ViewChild(Content) content: Content;
  posts:any;
  users:any;
  concernId:string;
  hasLike: boolean =false;
  isLike :string="";
  istheme:boolean = false;
  arr:Array<any> = [];
   following = false;
   hasfollowing = false;
   personid:string;
   imageUrl_1: string = 'assets/img/background/background1.jpg';
   imageUrl_2: string = 'assets/img/background/background2.jpg';
  constructor(public navCtrl: NavController,public data: AppData,navParams: NavParams,public userData: UserData,
    public alertCtrl: AlertController ,public storage: Storage,) {
     this.personid = navParams.get('personid');
   }
   ionViewDidLoad() {
     this.dynamicDetails();
     this.hasSeenfirst();
   }
   hasSeenfirst(){
    this.storage.get('hasTheme')
      .then((hasTheme) => {
        if (hasTheme) {
          this.istheme=true;
        } else {
          this.istheme=false;
        }  
      })
  }
 
  dynamicDetails(){
   this.userData.getUserid().then((userid) => {
    if(userid !== this.personid)
    {
      this.hasfollowing = true;
      this.Details();
      let myid = userid; 
      let toid = this.personid;
      let data = JSON.stringify({myid, toid});    
      this.data.getConcern(data).then(res => {
          let re :any = res;
            if(re.hasConcern)
            { 
              this.concernId = re.concernId;
              this.following = true;
            }
          }, err => { 
        })
      }
      else
      {
        this.hasfollowing = false
        this.Details();
      }
   })
     
  }
  Details() {
    this.data.getHttpDynamicDetailsPerson(this.personid).then(res => {
      this.users = res;
    }, err => {
      this.users = err;
    })
    this.data.getHttpDynamicDetails(this.personid).then(res => {
      this.posts = res;
    }, err => {
      this.posts = err;
    })

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
delete(dyid){
      let alert = this.alertCtrl.create({
      title: '确认删除',
      buttons: [
        '取消'
      ]
    });
    alert.addButton({
      text: '确定',
      handler: () => {
        this.data.DeleteDynamicbyID(dyid).then(res => {
          let data :any  = res;     
          if(data.success)
             {
                 this.Details();
             }
             else
             {
               
             }
        }, err => {
        });      
      }
    });
    alert.present();
}
 follow(toid) {
   this.following = !this.following;
    this.getUserid(toid);   
  }
  followbefor(toid) {
     this.following = !this.following;
    this.getUserid(toid);  
  }
  concern(myid,toid){
      setTimeout(() => {
        let data = JSON.stringify({ myid, toid });
        this.data.postAddConcern(data).then(res => {
          console.log(res);
          
        }, err => {
        })
      }, 2000)
  }
  beforconcern(myid,toid){
     let id = this.concernId;
      setTimeout(() => {
        let data = JSON.stringify({id, myid, toid });
        this.data.postReConcern(data).then(res => {
        }, err => {
        })
      }, 2000)
  }
  getUserid(toid) {
    this.userData.getUserid().then((userid) => {
      if(userid == null){
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
      else{
        if(this.following)
        {
          this.concern(userid,toid);
        }
        else
        {
          this.beforconcern(userid,toid);
        }
      }
    });
  }
gotoTop() {
    this.content.scrollToTop();
  }
comment(dynaimicID){
     this.navCtrl.push(HomeDetailPage,{ dynaimicID:dynaimicID});
  }
}
