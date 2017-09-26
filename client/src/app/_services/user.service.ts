/*
 * Copyright (c) Expression year is undefined on line 4, column 33 in Templates/Licenses/license-default.txt. Megam Technologies LLP
 * For License details, Please visit http://license.megamtech.com
 * If you need any support please mail us to itsupport@megamtech.com
 */

import {Injectable} from '@angular/core';
import {Response} from '@angular/http'
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

import {AuthenticationService} from '../_services/index';
import {User} from '../_models/index';
import {JwtHttp, AuthService} from 'ng2-ui-auth';

import {ConstantService} from '../_config/constants';
import {ApiService} from '../_services/api.service';

export interface ITokenUser {
    username: string;
    displayName?: string;
    picture?: string;
}


@Injectable()
export class UserService {
    user: ITokenUser;
    expiration: Date;
    constructor(
        private http: ApiService,
        private auth: AuthService,
        private authenticationService: AuthenticationService,
        public ConstantService: ConstantService) {
    }
    ngOnInit() {
        this.user = this.auth.getPayload();
        this.expiration = this.auth.getExpirationDate();
    }
    getUsers() {
        return this.http.post(ApiService.geturl('user', 'getuserlist'), {})
            .map((response: Response) => {
                return response.json();
            });
    }
    viewUser(id: string) {
        return this.http.post(ApiService.geturl('user', 'viewuser'), {filter: {muid: id}})
            .map((response: Response) => {
                return response.json()
            });
    }
    updateUser(firstname: string, lastname: string, email: string, id: string) {
        return this.http.post(ApiService.geturl('user', 'updateuser'), {firstname: firstname, lastname: lastname, email: email, muid: id})
            .map((response: Response) => {
                return response.json()
            });
    }
    suspendUser(id: string) {
        return this.http.post(ApiService.geturl('user', 'suspenduser'), {muid: id})
            .map((response: Response) => {
                return response.json();
            });
    }

    addUser(firstname: string, lastname: string, email: string, password: string, client_id: string) {
        return this.http.post(ApiService.geturl('user', 'adduser'), JSON.stringify({firstname: firstname, lastname: lastname, email: email, password: password, client_id: client_id}))
            .map((response: Response) => {
                return response.json();
            });
    }

    deleteUser(id: string) {
        return this.http.post(ApiService.geturl('user', 'deleteuser'), JSON.stringify({muid: id}))
            .map((response: Response) => {
                return response.json();
            });
    }

    getClientUsers(client_id: string) {
        return this.http.post(ApiService.geturl('user', 'getclientusers'), JSON.stringify({client_id: client_id}))
            .map((response: Response) => {
                return response.json();
            });
    }
    updateClientId(client_id: string, muid: string) {

        return this.http.post(ApiService.geturl('user', 'update_client_id'), JSON.stringify({client_id: client_id, muid: muid}))
            .map((response: Response) => {
                this.authenticationService.setDefaultClientId(client_id);
                return response.json();
            });
    }
}
