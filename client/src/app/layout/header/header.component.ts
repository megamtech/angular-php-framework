import {Component, OnInit, ElementRef} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {ClientService} from '../../_services/client.service';
import {Router} from '@angular/router';
import {SalesOrderService} from '../../_services/salesorder.service';
import {UserService} from '../../_services/user.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isFullSidebar: boolean;
    clientList: any;
    pending_orders_count: number;
    shipped_orders_count: number;
    client_id: string;
    role_id: number;
    fullname: string;
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router, private el: ElementRef,
        private client: ClientService,
        private salesorderservice: SalesOrderService,
        private userservice: UserService
    ) {

    }

    ngOnInit() {
        this.isFullSidebar = true;
        this.getClientList();
        this.getDefaultClientId();
        this.getPendingOrdersCount();
        this.getShippedOrdersCount();
        this.role_id = this.authenticationService.getUserRole();
        this.fullname = this.authenticationService.getUserFullName();
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['login']);
    }

    getClientList() {
        //        console.log(this.authenticationService.isClientRole());
        if (!this.authenticationService.isClientRole()) {
            this.client.getClients().subscribe((data) => {
                this.clientList = data;
            });
        } else {
            this.clientList = false;
        }
    }

    changeClientByDialog(client_id) {
        swal({
            title: 'Are you sure want to change Client?',

            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        }).then(() => {
            this.setDefaultClientId(client_id);

        }, (dismiss) => {
            if (dismiss === 'cancel') {

            }
        });

    }
    setDefaultClientId(client_id) {

        this.userservice.updateClientId(client_id, this.authenticationService.getUserId()).subscribe(result => {
            location.reload();
        });


    }
    getDefaultClientId() {
        this.client_id = this.authenticationService.getDefaultClientId();
    }
    sideBarCollapse() {
        let body = document.getElementsByTagName('body')[0];
        if (this.isFullSidebar) {
            body.classList.add("sidebar-mini");
            this.isFullSidebar = false;
        } else {
            body.classList.remove("sidebar-mini");
            this.isFullSidebar = true;
        }

    }
    getPendingOrdersCount() {
        this.salesorderservice.getPendingOrdersCount().subscribe((data) => {
            this.pending_orders_count = data['response']['count'];
        });
    }
    getShippedOrdersCount() {
        this.salesorderservice.getShippedOrdersCount().subscribe((data) => {
            this.shipped_orders_count = data['response']['count'];
        });
    }
}

