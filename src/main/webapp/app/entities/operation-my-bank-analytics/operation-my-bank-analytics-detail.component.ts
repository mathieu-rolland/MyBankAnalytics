import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OperationMyBankAnalytics } from './operation-my-bank-analytics.model';
import { OperationMyBankAnalyticsService } from './operation-my-bank-analytics.service';

@Component({
    selector: 'jhi-operation-my-bank-analytics-detail',
    templateUrl: './operation-my-bank-analytics-detail.component.html'
})
export class OperationMyBankAnalyticsDetailComponent implements OnInit, OnDestroy {

    operation: OperationMyBankAnalytics;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private operationService: OperationMyBankAnalyticsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOperations();
    }

    load(id) {
        this.operationService.find(id).subscribe((operation) => {
            this.operation = operation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOperations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'operationListModification',
            (response) => this.load(this.operation.id)
        );
    }
}
