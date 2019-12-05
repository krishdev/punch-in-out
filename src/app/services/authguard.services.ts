import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from './auth.services';
import { Constants } from '../configs';

@Injectable()
export class Authguard {

  constructor(private router: Router, private auth: AuthService, private constants: Constants) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate([this.constants.loginRoute]);
      return false;
    }
  }

}