import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AutoAffectParam } from './auto-affect-parameter.model';
import { AutoAffectParameterService } from './auto-affect-parameter.service';

@Component({
    selector: 'jhi-operation-my-bank-analytics-detail',
    templateUrl: './auto-affect-parameter-detail.component.html'
})
export class AutoAffectParameterDetailComponent implements OnInit, OnDestroy {

    param: AutoAffectParam;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private autoAffectParameterService: AutoAffectParameterService,
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
        this.autoAffectParameterService.find(id).subscribe((param) => {
            this.param = param;
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
            (response) => this.load(this.param.id)
        );
    }
}
