import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AutoAffectParam } from './auto-affect-parameter.model';
import { AutoAffectParameterService } from './auto-affect-parameter.service';

import { CategoryMyBankAnalytics, CategoryMyBankAnalyticsService } from '../category-my-bank-analytics';
import { BankAccountMyBankAnalytics, BankAccountMyBankAnalyticsService } from '../bank-account-my-bank-analytics';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-operation-my-bank-analytics-dialog',
    templateUrl: './auto-affect-parameter.component.html'
})
export class AutoAffectParameterComponent implements OnInit {

	parameters: AutoAffectParam[];
    predicate: any;
    reverse: any;
    page: any;

	constructor(
			private paramService: AutoAffectParameterService
	){
		this.predicate = 'id';
        this.reverse = true;
        this.page = 0;
	}

	sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    applyParam(){
        this.paramService.applyParameter().subscribe( 
            (res: ResponseWrapper) => console.log("OK"),
            (res: ResponseWrapper) => console.log("KO") 
        );
    }

	loadPage(page) {
        this.page = page;
        this.loadAll();
    }

	ngOnInit() {
        this.loadAll();
    }

    loadAll(){
    	this.paramService.findAll().subscribe( 
    			(res: ResponseWrapper) => this.parameters = res.json,
    			(res: ResponseWrapper) => this.onError( res.json )
    	);
    }

    trackId(index: number, item: AutoAffectParam) {
        return item.id;
    }

    onError( data: any ){
    	console.log( "Error received data" ); 
    }

}
