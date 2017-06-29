import { MessagePage } from './message/message';
import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
 chats = [{
    imageUrl: 'assets/img/icon/icon36.png',
    title: '图灵机器人',
    lastMessage: '有什么问题可问我哦',
    timestamp: new Date()
  }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  viewMessages(chat) {
    this.navCtrl.push(MessagePage, { chatId: chat.id });
  }

}
