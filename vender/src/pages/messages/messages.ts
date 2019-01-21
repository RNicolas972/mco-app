import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Profile } from '../../models/profile';
import { Profiles } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  currentItems: Profile[];

  constructor(public navCtrl: NavController, public profiles: Profiles, public navParams: NavParams) {
    this.currentItems = this.profiles.query();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

}
