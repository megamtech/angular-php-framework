import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {AuthenticationService} from '../../_services/index';
import {UserService} from '../../_services/index';
import swal from 'sweetalert2';

@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

    loading = false;
    error = '';
    userList: any;
    link: any;
    userListColumns = [];
    rows = [
        {name: 'Austin', gender: 'Male', company: 'Swimlane'},
        {name: 'Dany', gender: 'Male', company: 'KFC'},
        {name: 'Molly', gender: 'Female', company: 'Burger King'},
    ];
    columns = [
        {prop: 'name'},
        {name: 'Gender'},
        {name: 'Company'}
    ];
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;
    constructor(private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService) {}

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.userListColumns = [
            {name: 'First Name', prop: 'firstname'},
            {name: 'Last Name', prop: 'lastname'},
            {name: 'Email', prop: 'email'},
            {name: 'Action', cellTemplate: this.actionTmpl, prop: 'muid'},
        ];
        this.userService.getUsers()
            .subscribe(result => {
                this.userList = result;
            });

//        swal({
//            title: 'Are you sure?',
//            text: 'You will not be able to recover this imaginary file!',
//            type: 'warning',
//            showCancelButton: true,
//            confirmButtonText: 'Yes, delete it!',
//            cancelButtonText: 'No, keep it'
//        }).then(function () {
//            swal(
//                'Deleted!',
//                'Your imaginary file has been deleted.',
//                'success'
//            )
//        }, function (dismiss) {
//            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
//            if (dismiss === 'cancel') {
//                swal(
//                    'Cancelled',
//                    'Your imaginary file is safe :)',
//                    'error'
//                )
//            }
//        });
    }

    deleteUser(id) {
        this.userService.deleteUser(id).subscribe(result => {

        });
    }
}
