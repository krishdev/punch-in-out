import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from './localStorage/localstorage.services';
import { Constants } from '../configs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
    userId: string;
    constructor (
        private router: Router,
        private localStorage: LocalstorageService,
        private constants: Constants,
        public afAuth: AngularFireAuth,
    ) {}

    setToken(token: any) {
        this.userId = token.uid;
        this.localStorage.setLocalStorage(this.constants.tokenLabel, JSON.stringify(token));
    // this.sessionStorage.setItemSessionStorage(this.constants.token, token);
    }
    getToken() {
    return this.localStorage.getLocalStorage(this.constants.tokenLabel);
    // return this.sessionStorage.getItemSessionStorage(this.constants.token);
    }
    isLoggedIn() {
    return (this.getToken()) ? true : false;
    }
    logout() {
    this.localStorage.clearAllStorage();
    this.afAuth.auth.signOut();
    // this.sessionStorage.removeItemSessionStorage(this.constants.token);
    this.router.navigate([this.constants.loginRoute]);
    }

    getUserId() {
        let token = this.getToken();
        if(token) {
            token = JSON.parse(token).uid;
        } else {
            this.logout();
        }
        return token;
    }
}