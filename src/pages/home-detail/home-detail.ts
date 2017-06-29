import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Content,AlertController } from 'ionic-angular';
import { FormControl, FormBuilder } from '@angular/forms';
import { AppData } from '../../providers/app-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-home-detail',
  templateUrl: 'home-detail.html'
})
export class HomeDetailPage {
   public messageForm: any;
   chatBox: any;
   messages:any;
   comment:any;
   posts:any;
   person:any;
   isNumber:number;
   like :number;
   isLike :string;
   haslogin:boolean;
   nameid:string;
   @ViewChild(Content) content: Content;
   following = false;
   dynaimicID:string;
   isMessage:boolean = false;
 
  constructor(public navCtrl: NavController,public data: AppData,navParams: NavParams,public formBuilder: FormBuilder,
  public userData: UserData,public alertCtrl: AlertController) {
     this.dynaimicID = navParams.get('dynaimicID');
     this.messageForm = formBuilder.group({
      message: new FormControl('')
    });
    this.chatBox = "";
   }
   ionViewDidLoad() {
     this.dynamicDetails();
     this.dynamicDetailsMessage();
     this.getUserid();
     this.oepen();
   }
 
  dynamicDetails(){
      this.data.getHttpHomeDetailsGet(this.dynaimicID).then(res => {
        this.posts = res; 
        this.isNumber =  this.posts.messageNumber;
        }, err => {
          this.posts = err;
      })
  }
  dynamicDetailsMessage(){
      this.data.getHttpHomeDetailsMessageGet(this.dynaimicID).then(res => {
        this.messages = res; 
        }, err => {
          this.messages = err;
      })
  }
  simplePerson(userid){
      this.data.getHttpPersonSimple(userid).then(res => {
        this.person = res;
        }, err => {
          this.simplePerson = err;
      })
  }
  messageda(data){
      this.data.postMessage(data).then(res => {  
        }, err => {
      })
  }
  oepen() {
    this.userData.getUserid().then((userid) => {
      if (userid){
         this.haslogin = true; 
       }
      else {
        this.haslogin = false;
      }
    });
  }
  send (message) {
    if (message && message != "") {
    
      let messageData =
        {
          nickname: this.person.nickname,
          userImage: this.person.userImage,
          likes: 0,
          content: message,
          messagestime:"刚刚"
        }
      this.comment = messageData;
      this.isNumber =  this.isNumber +1; 
      setTimeout(() => {
         let Dynamicid = this.dynaimicID;
         let Personid = this.person.id;
         let content = message;
         let date ={Dynamicid,Personid,content}; 
         let data = JSON.stringify(date);
         console.log(this.nameid);
         
        if(this.nameid != this.person.id)
        {
         this.nameid = this.person.id;
         console.log(this.nameid);
         this.messageda(data); 
         this.isMessage = true;
         this.scrollToBottom();
        }
        else
        {
         let alert = this.alertCtrl.create({
          title: '不能频繁评论！',
          buttons: ['取消']});
          alert.addButton({
          text: '确定',
            });
            alert.present();
          }      
      }, 1000);
    }
    this.chatBox = "";
  }
   likeAdd(message){
      this.like = message.likes+1;
      if(this.isLike != message.id)
      {  
        this.like = message.likes+1;
        this.isLike = message.id; 
      }
      setTimeout(() => {
        let peid = message.personID;
        let toid = message.id;
        let data = JSON.stringify({ peid, toid });
        this.data.postAddLikes_me(data).then(res => {
        }, err => {
        })
      }, 2000)
  }
  likesRe(message){
      this.like = message.likes-1;
      this.isLike ="";
      setTimeout(() => {
        let peid = message.personID;
        let toid = message.id;
        let data = JSON.stringify({ peid, toid });
        this.data.postReLikes_me(data).then(res => {
        }, err => {
        })
      }, 2000)
  }
 getUserid() {
    this.userData.getUserid().then((userid) => {
       this.simplePerson(userid);
    });
  }
  
 follow() {
    this.following = !this.following;
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }
}