import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services/index';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../_services/api.service';

import {ActivatedRoute, NavigationStart, RoutesRecognized, RouterState, NavigationEnd, NavigationCancel, NavigationError, Router, Event as RouterEvent, Route} from '@angular/router';
import swal from 'sweetalert2';
@Component({
    selector: 'app-root',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    loading = false;
    public title: string;
    private routeData: any;
    constructor(
        private auth: AuthenticationService,
        private titleService: Title,
        private route: ActivatedRoute,
        //        private sroute: Route,
        private router: Router
    ) {
        if (!auth.isLoggedIn()) {
            //            this.sroute. = '/login';
            this.router.navigateByUrl('/');
        }
        router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event)
        })
    }
    navigationInterceptor(event: RouterEvent): void {

        //        console.log(this.route.toString());
        if (event instanceof NavigationStart) {
            this.loading = true
        }
        if (event instanceof NavigationEnd) {
            this.loading = false;
            this.route.data.subscribe(data => this.routeData);
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loading = false
        }
        if (event instanceof NavigationError) {
            this.loading = false
        }
    }
    ngOnInit() {
        this.router.events.subscribe((data) => {
            if (data instanceof RoutesRecognized) {
                this.routeData = data.state.root.firstChild.data;
                console.log(this.routeData);
            }
        });
    }


    public setTitle() {

        this.titleService.setTitle(this.routeData.title + ' - AtozGlobalServices');
    }
    isAuthenticated() {
        return this.auth.isLoggedIn();
    }

    public ngOnDestroy() {
        //        this.routeData.unsubscribe();
    }
}
