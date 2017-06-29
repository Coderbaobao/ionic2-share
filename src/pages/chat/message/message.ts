import { FormControl, FormBuilder } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { AppData } from '../../../providers/app-data';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  toUser = {
    _id: '534b8e5aaa5e7afc1b23e69b',
    pic: 'assets/img/icon/icon36.png',
    username: '图灵机器人',
  }

  user = {
    _id: '534b8fb2aa5e7afc1b23e69c',
    pic: 'assets/img/portrait/girl-avatar.png',
    username: '凉辰梦瑾空人心',
  };

  doneLoading = false;

  messages = [
    {
      _id: 1,
      date: new Date(),
      userId: this.toUser._id,
      username: this.toUser.username,
      pic: this.toUser.pic,
      text: '您好！我是图灵机器人'
    },
  ]

  @ViewChild(Content) content: Content;

  public messageForm: any;
  chatBox: any;
  text:string;
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,public appData: AppData) {
    this.messageForm = formBuilder.group({
      message: new FormControl('')
    });
    this.chatBox = "";

  }

 send (message) {
    if (message && message != "") {
      //this.messageService.sendMessage(chatId, message);
    this.posttuling(message);
      let messageData =
        {
          toId: this.user._id,
          _id: 2,
          date: new Date(),
          userId: this.user._id,
          username: this.user.username,
          pic: this.user.pic,
          text: message
        }
      
      this.messages.push(messageData);
      this.scrollToBottom();

      setTimeout(() => {
        let replyData =
          {
            toId: this.toUser._id,
            _id: 2,
            date: new Date(),
            userId: this.toUser._id,
            username: this.toUser.username,
            pic: this.toUser.pic,
            text: this.text
          }
        this.messages.push(replyData);
        this.scrollToBottom();
      }, 1000);
    }
    this.chatBox = "";
  }
 posttuling(info:string){
     let key = "18764c2743cb4280a1e7194c57c8ce60";
     let userid = this.user._id;
     let data = JSON.stringify({key,info,userid});
      this.appData.tuling(data).then(res => {
         let date:any = res;
         this.text = date.text;
         console.log(info);
         
      })
 }
  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }
 
  ngOnInit() {
  }
doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
