import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginService, ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../shared';

import { Chart } from 'angular-highcharts';
import { BankAccountMyBankAnalyticsService, BankAccountMyBankAnalytics } from '../entities/bank-account-my-bank-analytics';
import { OperationMyBankAnalyticsService, OperationMyBankAnalytics } from '../entities/operation-my-bank-analytics';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    options: Object;

    chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Line 1',
        data: [1, 0, 3]
      }]
    });

    itemsPerPage: 99;
    page: any;

    constructor(
        private principal: Principal,
        private loginService: LoginService,
        private eventManager: JhiEventManager,
        private accountService: BankAccountMyBankAnalyticsService,
        private operationService: OperationMyBankAnalyticsService
    ) {}

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

        this.loadAccountData();

    }

    loadAccountData() {
        console.log(this.accountService);
        this.accountService.query({page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onAccountsFetch(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    onAccountsFetch( data , header ) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const account: BankAccountMyBankAnalytics = data[i];
            this.operationService.query().subscribe( 
                    
                    (res : ResponseWrapper) => this.buildChart(res.json),
                    (res: ResponseWrapper) => this.onError(res.json)
                )
        }
    }

    buildChart(data){
        console.log(data);
    }

    onError( response ) {
         //TODO : improve error treatment
        console.log(response);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.loginService.login();
    }
}
