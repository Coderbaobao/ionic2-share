import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenfirst';
  HSA_THTEME ="hasTheme";

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  login(userid:string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUserId(userid);
    this.events.publish('user:login');
  };

  signup() {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:signup');
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('userid');
    this.events.publish('user:logout');
  };

  setUserId(userid: string) {
    this.storage.set('userid', userid);
  };

  getUserid() {
    return this.storage.get('userid').then((value) => {
      return value;
    });
  };

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial() {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    })
  };
   hasTeme() {
    return this.storage.get(this.HSA_THTEME).then((value) => {
      return value === true;
    });
  };
}
