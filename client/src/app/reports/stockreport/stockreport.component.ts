import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {ConstantService} from '../../_config/constants';
import {StockService} from '../../_services/index';
import {ClientService} from '../../_services/client.service';
import {AuthenticationService} from '../../_services/authentication.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
    selector: 'app-reports',
    templateUrl: './stockreport.component.html'
})
export class ReportsComponent implements OnInit {

    stocksReportListColumns: any;
    stocksReportList: any;
    clientList: any;
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;
    model: NgbDateStruct;
    date: {year: number, month: number};

    selectToday() {
        this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    }
    constructor(
        private http: Http,
        private StockService: StockService,
        private ClientService: ClientService,
        private route: ActivatedRoute,
        private authenticationservice: AuthenticationService
    ) {}

    ngOnInit() {
        this.getStockReports('', '');
        this.getClients();
    }

    getStockReports(product_name, product_id) {
        this.stocksReportListColumns = [
            {name: 'Product#', prop: 'client_product_id'},
            {name: 'Product Name', prop: 'product_name'},
            {name: 'Actual Qty', prop: 'actual_qty'},
            {name: 'CSV Qty', prop: 'csv_qty'},
            {name: 'Exp Qty', prop: 'expired_qty'},
            {name: 'Damaged Qty', prop: 'damaged_qty'},
            {name: 'Accpt Qty', prop: 'accepted_qty'},
            {name: 'Shipped Qty', prop: 'shipped_qty'},
            //            {name: 'Action', cellTemplate: this.actionTmpl, prop: 'muid'},
        ];
        this.StockService.getStockReports(product_name, product_id, this.authenticationservice.getDefaultClientId()).subscribe(result => {
            this.stocksReportList = result['response'];
        });
    }

    getClients() {
        this.ClientService.getClients().subscribe(result => {
            this.clientList = result;
        });

    }


}
