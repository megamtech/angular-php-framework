/*
 * Copyright (c) 2017. Megam Technologies LLP
 * For License details, Please visit http://license.megamtech.com
 * If you need any support please mail us to itsupport@megamtech.com
 */

import {Injectable, Inject} from '@angular/core';
import {Response} from '@angular/http';
import {JwtHttp} from 'ng2-ui-auth';
import 'rxjs/add/operator/map';
import {ConstantService} from '../_config/constants';

@Injectable()
export class ApiService {
    data: any;
    result: any;

    constructor(
        public http: JwtHttp
    ) {

    }
    get(data) {
        this.data = data;
        this.http.get('http://example.com/api/thing')
            .subscribe(
            data => this.result = data,
            err => console.log(err),
            () => console.log('Request Complete')
            );
    }
    static geturl(group, url) {
        var apiurl = ConstantService.API_URL[group][url];
        if (typeof url == 'undefined') {
            return '';
        }
        return ConstantService.BASE_URL + '/' + apiurl;
    }
    post(url, data) {
        this.data = data;
        return this.http.post(url, this.data);
    }
    update() {

    }
    put() {

    }
}