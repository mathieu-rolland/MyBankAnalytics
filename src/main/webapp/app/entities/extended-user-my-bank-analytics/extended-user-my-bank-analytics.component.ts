import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ExtendedUserMyBankAnalytics } from './extended-user-my-bank-analytics.model';
import { ExtendedUserMyBankAnalyticsService } from './extended-user-my-bank-analytics.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-extended-user-my-bank-analytics',
    templateUrl: './extended-user-my-bank-analytics.component.html'
})
export class ExtendedUserMyBankAnalyticsComponent implements OnInit, OnDestroy {
extendedUsers: ExtendedUserMyBankAnalytics[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private extendedUserService: ExtendedUserMyBankAnalyticsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.extendedUserService.query().subscribe(
            (res: ResponseWrapper) => {
                this.extendedUsers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInExtendedUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ExtendedUserMyBankAnalytics) {
        return item.id;
    }
    registerChangeInExtendedUsers() {
        this.eventSubscriber = this.eventManager.subscribe('extendedUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
