import { Component, OnInit, ViewEncapsulation , AfterViewInit, ElementRef} from '@angular/core';
import { DatePipe } from '@angular/common';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginService, ITEMS_PER_PAGE, Principal, ResponseWrapper, DateUtils } from '../shared';

import { Chart } from 'angular-highcharts';
import { ChartModule } from 'angular2-highcharts';
import { BankAccountMyBankAnalyticsService, BankAccountMyBankAnalytics } from '../entities/bank-account-my-bank-analytics';
import { OperationMyBankAnalyticsService, OperationMyBankAnalytics } from '../entities/operation-my-bank-analytics';
import { CategoryMyBankAnalytics } from '../entities/category-my-bank-analytics';
import { AreaClickEvent } from 'highcharts';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ],
    encapsulation: ViewEncapsulation.None,

})
export class HomeComponent implements OnInit, AfterViewInit {
    account: Account;
    options: Object;


    bankAccounts: BankAccountMyBankAnalytics[];
    regularFees: OperationMyBankAnalytics[];
    selectedCategory: OperationMyBankAnalytics[];
    
    operationsByCategory: any;
    selectedCategoryName: string;
    detailsOnChart: string;

    regularFeesSum: number;

    startDate: Date;
    endDate: Date;

    chartDebit: Chart;
    chartCredit: Chart;

    itemsPerPage: 99;
    page: any;

    constructor(
        private principal: Principal,
        private elementRef:ElementRef,
        private loginService: LoginService,
        private eventManager: JhiEventManager,
        private accountService: BankAccountMyBankAnalyticsService,
        private operationService: OperationMyBankAnalyticsService
    ) {

        this.bankAccounts = [];
        this.regularFees = [];
        this.operationsByCategory = [];
    }

    ngAfterViewInit() {
        this.addListenerOnController();
    }

    ngOnInit() {

        let componentScope = this;

        this.principal.identity().then((account) => {
            this.account = account;
        });

        this.registerAuthenticationSuccess();

        const selectMonth: Date = new Date();
        selectMonth.setMonth( selectMonth.getMonth() - 1 );

        // Calcul des dates :
        this.startDate = DateUtils.firstDayOftTheMonth( selectMonth );
        this.endDate = DateUtils.lastDayOfTheMonth( selectMonth );

        this.chartDebit = new Chart( {
           chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                useHTML: true
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
                    },
                    events:{
                        click: function( event ) {
                            componentScope.displaySelectedCategory( event , 'DEBIT');
                        }
                    }
                }
            },
            series: []
        } );

        this.chartCredit = new Chart( {
           chart:{
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title:{
                useHTML: true
            },
            tooltip:{
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions:{
                pie:{
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: 'black'
                        }
                    },events : {
                        click: function( event ) {
                            componentScope.displaySelectedCategory( event , 'CREDIT' );
                        }
                    }
                }
            },
            series: []
        } );

        //this.chartDebit.options.plotOptions.pie.events = PlotEvents
        // click.call( this.displaySelectedCategory );
        this.loadData();

    }

    displaySelectedCategory( e: AreaClickEvent , chartType: string ){
        if( chartType === 'CREDIT' ){
            this.detailsOnChart = "crédits";
        }else{
            this.detailsOnChart = "débits";
        }
        this.selectedCategoryName = e.point.name;
        this.selectedCategory = this.operationsByCategory[ this.selectedCategoryName ];
    }

    closeSelectedCategoryDetails(){
        this.detailsOnChart = null;
    }

    onNextClick() {
        const newDate: Date = this.startDate;
        newDate.setMonth( newDate.getMonth() + 1  );
        this.startDate = DateUtils.firstDayOftTheMonth( newDate );
        this.endDate = DateUtils.lastDayOfTheMonth( newDate );

        this.loadData();

    }

    onPreviousClick() {

        const newDate: Date = this.startDate;
        newDate.setMonth( newDate.getMonth() - 1  );
        this.startDate = DateUtils.firstDayOftTheMonth( newDate );
        this.endDate = DateUtils.lastDayOfTheMonth( newDate );

        this.loadData();

    }

    updateChartsTitle() {

        this.chartCredit.ref.setTitle({ 'text':
                    'Répartition des apports mensuel du '
                     + DateUtils.formatDate('dd/MM/yyyy', this.startDate )
                     +' au '
                     + DateUtils.formatDate('dd/MM/yyyy' , this.endDate )
                    });

        this.chartDebit.ref.setTitle({ 'text': '<img class="controller next" src="content/next.png" alt="next" (click)="nextMonth()"/>'
                    + 'Repartition des dépenses du '
                    + DateUtils.formatDate('dd/MM/yyyy', this.startDate )
                    +' au '
                    + DateUtils.formatDate('dd/MM/yyyy' , this.endDate )
                    + '<img class="controller previous" src="content/previous.png" alt="next" (click)="previousMonth()"/>' });

        this.addListenerOnController();

    }

    addListenerOnController() {
        this.elementRef.nativeElement.querySelector('.controller.next')
                                .addEventListener('click', this.onNextClick.bind(this));
        this.elementRef.nativeElement.querySelector('.controller.previous')
                                .addEventListener('click', this.onPreviousClick.bind(this));
    }

    loadData() {

        this.bankAccounts = [];

        this.getAllOperations();

        this.operationService.getRegularFees().subscribe(
                (res: ResponseWrapper) => this.onRegularFeesFetch(res.json),
                (res: ResponseWrapper) => this.onError(res.json)
         );

    }

    onRegularFeesFetch( data ){

        this.regularFees = data;
        
        /*Compute sum of futur regular fees*/
        this.regularFeesSum = 0;

        for( let index in this.regularFees){
            this.regularFeesSum += this.regularFees[index].amount;
        }
    }

    getAllOperations() {
        this.operationService.findBetweenDate(
            this.startDate,
            this.endDate
         ).subscribe(
                (res: ResponseWrapper) => this.generatePiechart( res.json ),
                (res: ResponseWrapper) => this.onError(res.json)
        )
    }

    generatePiechart( operations ) {

        this.chartCredit.removeSerie(0);
        this.chartDebit.removeSerie(0);

        const debit: any = {
            'title':'Debit Month',
            'colorByPoint': true
        };
        debit.data = [];

        const credit: any = {
            'title':'Credit Month',
            'colorByPoint': true
        };
        credit.data = [];

        for( let j = 0 ; j < operations.length ; j++ ) {

            const operation: OperationMyBankAnalytics = operations[j];
            const category: CategoryMyBankAnalytics = operation.categories.length == 0 ? null : operation.categories[0];

            const chartLabel: string = (category == null) ? 'TO BE DEFINED' : category.label;

            if( operation.amount < 0 ) {

                if( debit.data[chartLabel] ) {
                    debit.data[chartLabel].y += Math.abs(operation.amount);
                    debit.data[chartLabel].category = category;
                    debit.data[chartLabel].operations.push( operation );
                } else {
                    debit.data[ chartLabel ] = {
                        'name': chartLabel,
                        'y': Math.abs(operation.amount),
                        'operations': [operation]
                    };
                    this.operationsByCategory[chartLabel] = [];
                }
            }else{
                if( credit.data[ chartLabel ] ) {
                    credit.data[ chartLabel ].y += operation.amount;
                }else{
                    credit.data[ chartLabel ] = {
                        'name': chartLabel,
                        'y': operation.amount
                    };
                    this.operationsByCategory[chartLabel] = [];
                }
            }
            this.operationsByCategory[chartLabel].push( operation );
        }
        if (debit.data ) {
            for( const obj in debit.data ) {
               debit.data.push( debit.data[obj] );
            }
        }

        if( credit.data ) {    
            for( const obj in credit.data ) {
               credit.data.push( credit.data[obj] );
            }
        }
        
        this.chartDebit.addSerie( debit );
        this.chartCredit.addSerie( credit );
        this.updateChartsTitle();

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
