import {Component, OnInit, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    role_id: number;
    public is1Collapsed = true;
    public is2Collapsed = true;
    menuPermission: any;
    constructor(
        public el: ElementRef,
        private router: Router,
        private authenticationservice: AuthenticationService,

    ) {}

    ngOnInit() {

    }

    checkmenuPermission(menu_id: number) {
        this.menuPermission = {
            1: [5, 15, 20, 25, 30, 35, 40, 45],
            10: [30, 40, 45]
        }
        this.role_id = this.authenticationservice.getUserRole();
        if (this.menuPermission[this.role_id].indexOf(menu_id) >= 0) {
            return true;
        } else {
            return false;
        }
    }
}
