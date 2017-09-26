/*
 * Copyright (c) 2017 Megam Technologies LLP
 * For License details, Please visit http://license.megamtech.com
 * If you need any support please mail us to itsupport@megamtech.com
 */
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './_guards/auth.guard';

import {LoginComponent} from './user/login/login.component';

import {AdduserComponent} from './user/adduser/adduser.component';
import {UserlistComponent} from './user/userlist/userlist.component';
import {ViewUserComponent} from './user/userview/userview.component';
import {ReportsComponent} from './reports/stockreport/stockreport.component';
import {UnauthorizedComponent} from './user/unauthorized/unauthorized.component';

export const CLIENT_ROUTER_PROVIDERS = [
    AuthGuard
];

const appRoutes: Routes = [
    {path: 'user/:type', component: AdduserComponent, canActivate: [AuthGuard]},
    {path: 'user/:type/:id', component: AdduserComponent, canActivate: [AuthGuard]},
    {path: 'userlist', component: UserlistComponent, data: {title: "User List", "required_login": false}, canActivate: [AuthGuard]},
    {path: 'viewuser/:id', component: ViewUserComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent, data: {title: "TEST Login", "required_login": false}},
    {path: 'reports/:type', component: ReportsComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/login', pathMatch: 'full', data: {title: "TEST Login", "required_login": false}, canActivate: [AuthGuard]},
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: '**', component: UnauthorizedComponent}
]

export const routing = RouterModule.forRoot(appRoutes);
