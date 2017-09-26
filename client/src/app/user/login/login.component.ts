
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../_services/index';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {}

    ngOnInit() {
        // reset login status
        //        this.authenticationService.logout();
    }

    login(data) {

        this.loading = true;
        console.log(data);
        this.authenticationService.login(data.username, data.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigateByUrl('/salesorder/viewall');
                    location.reload();
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}