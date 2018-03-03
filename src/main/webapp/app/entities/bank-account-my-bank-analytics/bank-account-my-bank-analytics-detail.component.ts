import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BankAccountMyBankAnalytics } from './bank-account-my-bank-analytics.model';
import { BankAccountMyBankAnalyticsService } from './bank-account-my-bank-analytics.service';

@Component({
    selector: 'jhi-bank-account-my-bank-analytics-detail',
    templateUrl: './bank-account-my-bank-analytics-detail.component.html'
})
export class BankAccountMyBankAnalyticsDetailComponent implements OnInit, OnDestroy {

    bankAccount: BankAccountMyBankAnalytics;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bankAccountService: BankAccountMyBankAnalyticsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBankAccounts();
    }

    load(id) {
        this.bankAccountService.find(id).subscribe((bankAccount) => {
            this.bankAccount = bankAccount;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBankAccounts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bankAccountListModification',
            (response) => this.load(this.bankAccount.id)
        );
    }
}
