/*
 * Copyright (c) Expression year is undefined on line 4, column 33 in Templates/Licenses/license-default.txt. Megam Technologies LLP
 * For License details, Please visit http://license.megamtech.com
 * If you need any support please mail us to itsupport@megamtech.com
 */

import {Injectable} from '@angular/core';
@Injectable()
export class ConstantService {

    public static BASE_URL = 'http://127.0.0.1/server';
    public static API_URL = {
        'user': {
            'login': 'login',
            'getuserlist': 'getuserlist',
            'updateuser': 'updateuser',
            'suspenduser': 'suspenduser',
            'adduser': 'adduser',
            'deleteuser': 'deleteuser',
            'viewuser': 'viewuser',
        
        },
        
    };




    constructor() {
    }
}