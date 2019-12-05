import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.services';
import { Authguard } from './authguard.services';
import { LocalstorageService } from './localStorage/localstorage.services';
import { Constants } from '../configs'

@NgModule({
    declarations: [],
    imports: [
      CommonModule
    ],
    providers: [Authguard, AuthService, LocalstorageService, Constants]
  })
  export class ServiceModule { }