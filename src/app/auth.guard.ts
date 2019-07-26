import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/user-login']);
            return false;
        }
    }

    isLoggedIn() {
      const day = moment.unix(Number(localStorage.getItem('exp')));
      return moment().isBefore(day);
    }
}
