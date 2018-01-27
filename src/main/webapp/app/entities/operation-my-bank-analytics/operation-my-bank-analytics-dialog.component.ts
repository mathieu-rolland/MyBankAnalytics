import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OperationMyBankAnalytics } from './operation-my-bank-analytics.model';
import { OperationMyBankAnalyticsPopupService } from './operation-my-bank-analytics-popup.service';
import { OperationMyBankAnalyticsService } from './operation-my-bank-analytics.service';
import { CategoryMyBankAnalytics, CategoryMyBankAnalyticsService } from '../category-my-bank-analytics';
import { BankAccountMyBankAnalytics, BankAccountMyBankAnalyticsService } from '../bank-account-my-bank-analytics';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-operation-my-bank-analytics-dialog',
    templateUrl: './operation-my-bank-analytics-dialog.component.html'
})
export class OperationMyBankAnalyticsDialogComponent implements OnInit {

    operation: OperationMyBankAnalytics;
    isSaving: boolean;

    categories: CategoryMyBankAnalytics[];

    bankaccounts: BankAccountMyBankAnalytics[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private operationService: OperationMyBankAnalyticsService,
        private categoryService: CategoryMyBankAnalyticsService,
        private bankAccountService: BankAccountMyBankAnalyticsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.categoryService.query()
            .subscribe((res: ResponseWrapper) => { this.categories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.bankAccountService.query()
            .subscribe((res: ResponseWrapper) => { this.bankaccounts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.operation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.operationService.update(this.operation));
        } else {
            this.subscribeToSaveResponse(
                this.operationService.create(this.operation));
        }
    }

    private subscribeToSaveResponse(result: Observable<OperationMyBankAnalytics>) {
        result.subscribe((res: OperationMyBankAnalytics) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OperationMyBankAnalytics) {
        this.eventManager.broadcast({ name: 'operationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCategoryById(index: number, item: CategoryMyBankAnalytics) {
        return item.id;
    }

    trackBankAccountById(index: number, item: BankAccountMyBankAnalytics) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-operation-my-bank-analytics-popup',
    template: ''
})
export class OperationMyBankAnalyticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private operationPopupService: OperationMyBankAnalyticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.operationPopupService
                    .open(OperationMyBankAnalyticsDialogComponent as Component, params['id']);
            } else {
                this.operationPopupService
                    .open(OperationMyBankAnalyticsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
