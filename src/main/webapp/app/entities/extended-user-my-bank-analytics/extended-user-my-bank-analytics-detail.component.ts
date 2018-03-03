import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ExtendedUserMyBankAnalytics } from './extended-user-my-bank-analytics.model';
import { ExtendedUserMyBankAnalyticsService } from './extended-user-my-bank-analytics.service';

@Component({
    selector: 'jhi-extended-user-my-bank-analytics-detail',
    templateUrl: './extended-user-my-bank-analytics-detail.component.html'
})
export class ExtendedUserMyBankAnalyticsDetailComponent implements OnInit, OnDestroy {

    extendedUser: ExtendedUserMyBankAnalytics;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private extendedUserService: ExtendedUserMyBankAnalyticsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInExtendedUsers();
    }

    load(id) {
        this.extendedUserService.find(id).subscribe((extendedUser) => {
            this.extendedUser = extendedUser;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExtendedUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'extendedUserListModification',
            (response) => this.load(this.extendedUser.id)
        );
    }
}
