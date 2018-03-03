import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BankAccountMyBankAnalytics } from './bank-account-my-bank-analytics.model';
import { ParserType } from './parser-type-my-bank-analytics.model';
import { BankAccountMyBankAnalyticsPopupService } from './bank-account-my-bank-analytics-popup.service';
import { BankAccountMyBankAnalyticsService } from './bank-account-my-bank-analytics.service';
import { ExtendedUserMyBankAnalytics, ExtendedUserMyBankAnalyticsService } from '../extended-user-my-bank-analytics';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bank-account-my-bank-analytics-dialog',
    templateUrl: './bank-account-my-bank-analytics-dialog.component.html'
})
export class BankAccountMyBankAnalyticsDialogComponent implements OnInit {

    bankAccount: BankAccountMyBankAnalytics;
    isSaving: boolean;

    extendedusers: ExtendedUserMyBankAnalytics[];
    parsers: ParserType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bankAccountService: BankAccountMyBankAnalyticsService,
        private extendedUserService: ExtendedUserMyBankAnalyticsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.extendedUserService.query()
            .subscribe((res: ResponseWrapper) => { this.extendedusers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.bankAccountService.getAvailableParsers().subscribe(
            ((res:ResponseWrapper) => this.parsers = res.json),
            ((res:ResponseWrapper) => this.onError(res.json))
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bankAccount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bankAccountService.update(this.bankAccount));
        } else {
            this.subscribeToSaveResponse(
                this.bankAccountService.create(this.bankAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<BankAccountMyBankAnalytics>) {
        result.subscribe((res: BankAccountMyBankAnalytics) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BankAccountMyBankAnalytics) {
        this.eventManager.broadcast({ name: 'bankAccountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackExtendedUserById(index: number, item: ExtendedUserMyBankAnalytics) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bank-account-my-bank-analytics-popup',
    template: ''
})
export class BankAccountMyBankAnalyticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankAccountPopupService: BankAccountMyBankAnalyticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bankAccountPopupService
                    .open(BankAccountMyBankAnalyticsDialogComponent as Component, params['id']);
            } else {
                this.bankAccountPopupService
                    .open(BankAccountMyBankAnalyticsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
