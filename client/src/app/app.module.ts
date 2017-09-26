import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, JsonpModule} from '@angular/http';
//import {AuthHttp, AuthConfig} from 'angular2-jwt';
//import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import * as $ from 'jquery';
import {Ng2UiAuthModule, CustomConfig} from 'ng2-ui-auth';
import {Ng2Webstorage} from 'ngx-webstorage';
//import {AppSettings} from '../config/settings'
//import {Storage} from '@angular/storage';

import {UtilsPipe} from './utils.pipe';
import {LayoutComponent} from './layout/layout.component';
import {HeaderComponent} from './layout/header/header.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {FooterComponent} from './layout/footer/footer.component';
import {SalesOrderFormComponent} from './sales_order/salesorder.component';
//NgBootStrap CSS
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService, UserService} from './_services/index';

import {ConstantService} from './_config/constants';
import {RouterModule, Routes} from '@angular/router';
import {routing, CLIENT_ROUTER_PROVIDERS} from './app.routing';
import {AuthGuard} from './_guards/auth.guard';
import {ApiService} from './_services/api.service';


import {LoginComponent} from './user/login/login.component';
import {AdduserComponent} from './user/adduser/adduser.component';
import {UserlistComponent} from './user/userlist/userlist.component';
import {ViewUserComponent} from './user/userview/userview.component';
import {ReportsComponent} from './reports/stockreport/stockreport.component';


import {FileDropDirective, FileSelectDirective} from 'ng2-file-upload';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgUploaderModule} from 'ngx-uploader';
import {UnauthorizedComponent} from './user/unauthorized/unauthorized.component';

//let storage = new Storage();

//export function getAuthHttp(http) {
//    return new AuthHttp(new AuthConfig({
//        headerPrefix: 'MegamTechnologies',
//        noJwtError: true,
//        globalHeaders: [{'Accept': 'application/json'}],
//        tokenGetter: (() => storage.get('token')),
//    }), http);
//}

export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    loginUrl = ApiService.geturl('user', 'login');
    //    providers = {google: {clientId: GOOGLE_CLIENT_ID}};
}

@NgModule({
    declarations: [
        UtilsPipe,
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        ProductsComponent,
        LoginComponent,
        AdduserComponent,
        UserlistComponent,
        ViewUserComponent,
        FileDropDirective,
        FileSelectDirective,
        ReportsComponent,
        NgbdModalContent,
        UnauthorizedComponent,
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        JsonpModule,
        NgxDatatableModule,
        NgUploaderModule,
        Ng2UiAuthModule.forRoot(MyAuthConfig),
        Ng2Webstorage
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        ConstantService,
        Title,
        NgbActiveModal,
        CLIENT_ROUTER_PROVIDERS,
        ApiService

    ],
    exports: [RouterModule],
    bootstrap: [LayoutComponent],
    entryComponents: [NgbdModalContent]
})
export class AppModule {}
