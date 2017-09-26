/*
 * Copyright (c) Expression year is undefined on line 4, column 33 in Templates/Licenses/license-default.txt. Megam Technologies LLP
 * For License details, Please visit http://license.megamtech.com
 * If you need any support please mail us to itsupport@megamtech.com
 */

import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {Title} from '@angular/platform-browser';
//import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private titleService: Title, private auth: AuthenticationService) {}


    loggedIn() {
        //        return tokenNotExpired();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.isLoggedIn()) {
            // logged in so return true
            let isuserroleallowed: boolean;
            //            console.log(route.routeConfig.data);
            switch (this.auth.getUserRole()) {
                case 1:
                    isuserroleallowed = this.checkForAdminRole(state.url.toString());
                    break;
                
                case -1:
                    isuserroleallowed = this.checkForSuperAdminRole(state.url.toString());
                    break;
              
                default:
                    isuserroleallowed = false;
                    break;
            }
            if (isuserroleallowed === false) {
                this.router.navigate(['/unauthorized']);
            } else {


            }
            return isuserroleallowed;
        } else {
            // not logged in so redirect to login page
            this.router.navigate(['/login']);
            return false;
        }



    }
   
    checkForAdminRole(url: string): boolean {
        console.log(url);
        return true;
    }
    checkForSuperAdminRole(url: string): boolean {
        return false;
    }
   
}
