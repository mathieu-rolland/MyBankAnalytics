import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BankAccountMyBankAnalytics } from './bank-account-my-bank-analytics.model';
import { BankAccountMyBankAnalyticsPopupService } from './bank-account-my-bank-analytics-popup.service';
import { BankAccountMyBankAnalyticsService } from './bank-account-my-bank-analytics.service';

@Component({
    selector: 'jhi-bank-account-my-bank-analytics-delete-dialog',
    templateUrl: './bank-account-my-bank-analytics-delete-dialog.component.html'
})
export class BankAccountMyBankAnalyticsDeleteDialogComponent {

    bankAccount: BankAccountMyBankAnalytics;

    constructor(
        private bankAccountService: BankAccountMyBankAnalyticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bankAccountService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bankAccountListModification',
                content: 'Deleted an bankAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bank-account-my-bank-analytics-delete-popup',
    template: ''
})
export class BankAccountMyBankAnalyticsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankAccountPopupService: BankAccountMyBankAnalyticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bankAccountPopupService
                .open(BankAccountMyBankAnalyticsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
