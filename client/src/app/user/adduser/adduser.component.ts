import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {AuthenticationService} from '../../_services/index';
import {UserService} from '../../_services/index';
import swal from 'sweetalert2';

@Component({
    selector: 'app-adduser',
    templateUrl: './adduser.component.html',
    styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

    loading = false;
    error = '';
    id: string;
    type: string;
    user: any;
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;

    constructor(
        private router: Router,
        private authenticationservice: AuthenticationService,
        private userService: UserService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {

        this.route.paramMap.subscribe((params: ParamMap) => {
            this.type = params.get('type');
            this.id = params.get('id');

            if (this.id != null) {
                this.getUserDetails(this.id);
            }
        });
    }

    addUser(data) {
        this.userService.addUser(data.firstname, data.lastname, data.email, data.password, this.authenticationservice.getDefaultClientId())
            .subscribe(result => {
                if (result['status_code'] == 1) {
                    this.router.navigate(['userlist']);
                    swal(
                        'Success!',
                        result['response']['message'],
                        'success'
                    )
                } else {
                    swal(
                        'Error!',
                        result['response']['error'],
                        'error'
                    )
                }
            });
    }

    getUsers() {
        this.userService.getUsers()
            .subscribe(result => {
                console.log(result);
            });
    }
    getUserDetails(muid) {
        this.userService.viewUser(muid)
            .subscribe(result => {
                this.user = result['response'][0];
            });
    }

    updateUser(data) {
        this.userService.updateUser(data.firstname, data.lastname, data.email, this.id).subscribe(result => {

        });
    }



}
