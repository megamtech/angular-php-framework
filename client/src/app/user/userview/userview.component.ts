import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {AuthenticationService} from '../../_services/index';
import {UserService} from '../../_services/index';
import {User} from '../../_models/user';

@Component({
    selector: 'app-userview',
    templateUrl: './userview.component.html',
    styleUrls: ['./userview.component.css']
})
export class ViewUserComponent implements OnInit {

    loading = false;
    error = '';
    id: string;
    user: any;
    constructor(private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private route: ActivatedRoute,

    ) {}

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            let userId = params.get('id');
            console.log(userId);
            this.user = this.userService.viewUser(userId).subscribe(result => {
                console.log(result);
                this.user = result[0];
                console.log(this.user);
            });
        });

    }


}
