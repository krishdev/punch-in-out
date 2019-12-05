import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Constants } from '../../configs'
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForms: FormGroup;
  formSubmitted: boolean = false;
  userLoggedIn: boolean = false;
  errorMessage: string;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private constants: Constants,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForms = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.logout();
  }

  get f() {
    return this.loginForms.controls;
  }

  loginUser() {
    this.formSubmitted = true;  
    if(!this.loginForms.invalid) {
      const credentials = {
        email: this.loginForms.get('email').value,
        password: this.loginForms.get('password').value
      }
      this.login(credentials);
    }
  }

  login(credentials) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then((response)=> {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        console.log(response);
        return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(res=>{
            console.log(res.user);
            this.authService.setToken(res.user);
            this.userLoggedIn = true;
            this.router.navigate([this.constants.homeRoute]);
          }).catch(err => {
            this.errorMessage = "Username or Password doesn't match."
            console.log('Something went wrong:',err.message);
          });;
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });     
  }

  forgotPass() {

  }

  register() {
    this.router.navigate([this.constants.registerRoute])
  }

    logout() {
    this.afAuth.auth.signOut();
  }

}
