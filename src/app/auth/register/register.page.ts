import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { Constants } from '../../configs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordConfirmValidator } from '../../validations/repeatPassword.validators';
import { ModalPagePage } from '../../modal-page/modal-page.page';
import {ModalController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentialsForm: FormGroup;
  registrationSuccessful: boolean = false;
  formSubmitted: boolean = false;
  errorMessage: string;
  createdFrom: any = {
    lat: "",
    long: ""
  }

  constructor(
    public afAuth: AngularFireAuth,
    private constants: Constants,
    private router: Router,
    private modalController: ModalController,
    private geolocation: Geolocation,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.credentialsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, PasswordConfirmValidator])
    });
    
    this.geolocation.getCurrentPosition().then((resp) => {
      this.createdFrom.lat = resp.coords.latitude;
      this.createdFrom.long = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  get f() {
    return this.credentialsForm.controls;
  }

  registerUser() {
    this.formSubmitted = true;
    
    if(!this.credentialsForm.invalid) {
      const credentialsForm = {
        email: this.credentialsForm.get('email').value,
        password: this.credentialsForm.get('password').value
      }

      this.register(credentialsForm);
      // if(userRegistered) {
      //   if(userRegistered && (!userRegistered["i"] || userRegistered["i"].code)) {
      //     this.errorMessage = userRegistered["i"] ? userRegistered["i"].message : 'Sorry user already exists';
      //     console.log(userRegistered)
      //   } else {
      //     this.registrationSuccessful = true;
      //     this.openModal();
      //     this.resetForm();
      //   }
      // }
    }
  }

  register(credentialsForm) {
    const email = credentialsForm.email;
    const createdOn = new Date().toISOString();
    const createdFrom = this.createdFrom;
    const name = this.credentialsForm.get('name').value;
    this.afAuth.auth.createUserWithEmailAndPassword(credentialsForm.email, credentialsForm.password).then((newUserCredential: firebase.auth.UserCredential)=>{
      this.registrationSuccessful = true;      
      firebase
        .firestore()
        .doc(`/userDetails/${newUserCredential.user.uid}`)
        .set({ email, createdOn, name, createdFrom});
      this.openModal();
      this.resetForm();      
    }).catch(err=>{
      if(err.code == "auth/email-already-in-use") {
        this.errorMessage = "Sorry user already exists";
      } else if(err.code == "auth/invalid-email") {
        this.errorMessage = err.message;
      } else {
        this.errorMessage = "Something went wrong! Please try again.";
      }
    })
  }
  // logout() {
  //   this.afAuth.auth.signOut();
  // }
  
  login() {
    this.router.navigate([this.constants.loginRoute]);
  }

  resetForm () {
    this.credentialsForm.reset();
    this.formSubmitted = false;
    this.registrationSuccessful = false;
  }

  async openModal() {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
          component: ModalPagePage,
          componentProps: {
            aParameter: 'registerSuccessful',
            otherParameter: new Date()
          }
    });
      
    modal.onDidDismiss().then((detail: any) => {
      if (detail !== null) {
        console.log('The result:', detail.data);
      }
    });
    
    await modal.present();
  }

}
