import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginService, ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../shared';

import { Chart } from 'angular-highcharts';
import { BankAccountMyBankAnalyticsService, BankAccountMyBankAnalytics } from '../entities/bank-account-my-bank-analytics';
import { OperationMyBankAnalyticsService, OperationMyBankAnalytics } from '../entities/operation-my-bank-analytics';
import { CategoryMyBankAnalytics } from '../entities/category-my-bank-analytics';

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

    bankAccounts: BankAccountMyBankAnalytics[];

    /*chart = new Chart({
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
    });*/

    chartDebit: Chart;
    chartCredit: Chart;

    itemsPerPage: 99;
    page: any;

    constructor(
        private principal: Principal,
        private loginService: LoginService,
        private eventManager: JhiEventManager,
        private accountService: BankAccountMyBankAnalyticsService,
        private operationService: OperationMyBankAnalyticsService
    ) {

        this.bankAccounts = [];

    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

        this.loadAccountData();

        this.chartDebit = new Chart( {
           chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Repartition des dépense sur les données disponible'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.1f} €</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y:.1f} €',
                        style: {
                            color: 'black'
                        }
                    }
                } 
            },
            series: []
        } );



        this.chartCredit = new Chart( {
           chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Répartition des apports mensuel sur les données disponibles'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: 'black'
                        }
                    }
                } 
            },
            series: []
        } );
    }



    loadAccountData() {
        this.accountService.query({page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: ResponseWrapper) => this.onAccountsFetch(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    onAccountsFetch( data , header ) {
        for (let i = 0; i < data.length; i++) {
            const account: BankAccountMyBankAnalytics = data[i];
            this.operationService.query({size: this.itemsPerPage}).subscribe(
                    (res: ResponseWrapper) => this.registerOperationForAccount( res.json , account),
                    (res: ResponseWrapper) => this.onError(res.json)
            )
        }
        
    }

    registerOperationForAccount( operations , account ) {
        account.operations = operations;
        this.bankAccounts.push(account);
        this.generatePiechart( this.bankAccounts );
    }

    generatePiechart( bankAccounts )
    {
        let debit: any = {
            'title':'Debit Month',
            'colorByPoint': true
        };
        debit.data = [];

        let credit: any = {
            'title':'Credit Month',
            'colorByPoint': true
        };
        credit.data = [];

        for (let i = 0; i < bankAccounts.length; i++) {
            const operations: OperationMyBankAnalytics[] = bankAccounts[i].operations;
            for( let j = 0 ; j < operations.length ; j++ ){
                const operation: OperationMyBankAnalytics = operations[j];
                const category: CategoryMyBankAnalytics = operation.categories.length == 0 ? null : operation.categories[0];

                const chartLabel: string = category == null ? 'TO BE DEFINED' : category.label;

                if( operation.amount < 0 ){

                    if( debit.data[chartLabel] ){
                        debit.data[chartLabel].y += Math.abs(operation.amount) ;
                    }else{
                        debit.data[chartLabel] = {
                            'name': chartLabel,
                            'y': Math.abs(operation.amount)
                        };
                    }
                }else{
                     if( credit.data[chartLabel] ){
                        credit.data[chartLabel].y += operation.amount ;
                    }else{
                        credit.data[chartLabel] = {
                            'name': chartLabel,
                            'y': operation.amount
                        };
                    }
                }
                //serie.data.push( {'name' : chartLabel , 'y': operation.amount} );
            }
        }
        
        for( const obj in debit.data){
           debit.data.push( debit.data[obj] );
        }
        for( const obj in credit.data){
           credit.data.push( credit.data[obj] );
        }
        console.log(debit);
        this.chartDebit.addSerie( debit );
        this.chartCredit.addSerie( credit );
    }

    onError( response ) {
        // TODO : improve error treatment
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
