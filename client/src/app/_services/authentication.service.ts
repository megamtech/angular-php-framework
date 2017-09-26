/**
 * Copyright (c) Expression year is undefined on line 4, column 33 in Templates/Licenses/license-default.txt. Megam Technologies LLP
 * For License details, Please visit http://license.megamtech.com
 * If you need any support please mail us to itsupport@megamtech.com
 */


import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {AuthService} from 'ng2-ui-auth';
import {User} from '../_models/user';
import 'rxjs/add/operator/map';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';



@Injectable()
export class AuthenticationService {
    public token: string;
    private user: User;
    constructor(
        private http: Http,
        private auth: AuthService,
        private router: Router,
        private localstorage: LocalStorageService
        //        public jwthelper: JwtHelperService
    ) {
        // set token if saved in local storage
    }

    login(username: string, password: string) {

        return this.auth.login(JSON.stringify({username: username, password: password}))
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                console.log(token);
                if (typeof token !== 'undefined') {
                    this.auth.setToken(token);
                    if (this.auth.isAuthenticated() === true) {
                        this.getUserDetails();
                        if (this.user['default_client_id'] !== null) {
                            this.setDefaultClientId(this.user['default_client_id']);
                        }
                        return true;
                    }
                }
                return false;
            });

    }
    getUserDetails() {
        var userDetails = this.auth.getPayload();
        if (typeof userDetails !== 'undefined') {
            this.user = userDetails.data;
        } else {
            return false;
        }
    }

    getUserId() {
        //        if (typeof this.user == 'undefined') {
        //            this.getUserDetails();
        //        }
        return this.auth.getPayload().data.muid;
    }
    getUserFullName() {
        //        if (typeof this.user == 'undefined') {
        //            this.getUserDetails();
        //        }
        return this.auth.getPayload().data.fullname;
    }
    getUserName() {
        //        if (typeof this.user == 'undefined') {
        //            this.getUserDetails();
        //        }
        return this.auth.getPayload().data.username;
    }
    getUserRole() {
        //        if (typeof this.user == 'undefined') {
        //            this.getUserDetails();
        //        }
        return this.auth.getPayload().data.role_id;
    }
    isClientRole() {
        if (this.auth.getPayload().data.role_id == 10) {
            return true;
        } else {
            return false;
        }
    }

    getDefaultClientId() {
        //        if (typeof this.user == 'undefined') {
        //            this.getUserDetails();
        //        }
        //        return this.auth.getPayload().data.default_client_id;
        return this.localstorage.retrieve('client_id');
    }
    setDefaultClientId(client_id) {
        this.localstorage.store('client_id', client_id);
    }

    isLoggedIn() {
        return this.auth.isAuthenticated();
    }
    getToken() {
        return this.auth.getToken();
    }
    getAuthHeaders() {
        return {'Authorization': 'Bearer ' + this.getToken()}
    }
    logout(): void {
        // clear token remove user from local storage to log user out

        this.auth.logout()
            .subscribe({
                complete: () => {
                    this.localstorage.clear('client_id');
                    this.user = null;
                    //                    UIService.notify('You have been logged out', 'info');
                    //                    $state.go('login');
                }
            });
        this.auth.removeToken();
        this.router.navigateByUrl('/login');
    }
}