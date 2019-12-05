import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage {

  myParameter: string;
  myOtherParameter: Date;
  registrationSuccessMessage: boolean = false;

  constructor(private modalController: ModalController,
              private navParams: NavParams) {
  }
  ionViewWillEnter() {
    this.myParameter = this.navParams.get('aParameter');
    this.myOtherParameter = this.navParams.get('otherParameter');
    
    if(this.myParameter == "registerSuccessful") {
      this.registrationSuccessMessage = true;
    }
  }
  async myDismiss() {
    const result: Date = new Date();
    
    await this.modalController.dismiss(result);
  }

}
